import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Racine des médias à trier
const MEDIA_ROOT = path.join(process.cwd(), 'public', 'media', 'quality');
const PUBLIC_PREFIX = '/media/quality';

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
const VIDEO_EXT = ['.mp4', '.webm', '.mov', '.m4v'];

function kindOf(file) {
  const ext = path.extname(file).toLowerCase();
  if (IMAGE_EXT.includes(ext)) return 'image';
  if (VIDEO_EXT.includes(ext)) return 'video';
  return null;
}

// Empêche toute évasion hors de MEDIA_ROOT (path traversal)
function safeCategory(cat) {
  if (typeof cat !== 'string' || !cat) return null;
  // une seule composante de dossier, alphanumérique/tiret/underscore
  if (!/^[a-zA-Z0-9_-]+$/.test(cat)) return null;
  return cat;
}

function safeFile(file) {
  if (typeof file !== 'string' || !file) return null;
  if (file.includes('/') || file.includes('\\') || file.includes('..')) return null;
  return file;
}

// GET : renvoie la liste des catégories et de leurs médias
export async function GET() {
  try {
    const entries = await fs.readdir(MEDIA_ROOT, { withFileTypes: true });
    const categories = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const cat = entry.name;
      const dirPath = path.join(MEDIA_ROOT, cat);
      const files = await fs.readdir(dirPath);
      const items = [];
      for (const file of files) {
        const kind = kindOf(file);
        if (!kind) continue;
        items.push({
          file,
          kind,
          url: `${PUBLIC_PREFIX}/${cat}/${file}`,
        });
      }
      items.sort((a, b) => a.file.localeCompare(b.file));
      categories.push({ name: cat, count: items.length, items });
    }

    categories.sort((a, b) => a.name.localeCompare(b.name));
    return NextResponse.json({ categories });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}

// POST : déplace un fichier d'une catégorie vers une autre
// body: { file, from, to }
export async function POST(request) {
  try {
    const body = await request.json();
    const file = safeFile(body.file);
    const from = safeCategory(body.from);
    const to = safeCategory(body.to);

    if (!file || !from || !to) {
      return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400 });
    }
    if (from === to) {
      return NextResponse.json({ error: 'Catégorie identique' }, { status: 400 });
    }

    const src = path.join(MEDIA_ROOT, from, file);
    const destDir = path.join(MEDIA_ROOT, to);
    let dest = path.join(destDir, file);

    // La catégorie de destination doit exister
    try {
      await fs.access(destDir);
    } catch {
      return NextResponse.json({ error: `Catégorie destination inexistante: ${to}` }, { status: 400 });
    }

    // Le fichier source doit exister
    try {
      await fs.access(src);
    } catch {
      return NextResponse.json({ error: 'Fichier source introuvable' }, { status: 404 });
    }

    // Évite d'écraser : suffixe si collision
    let finalName = file;
    try {
      await fs.access(dest);
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      finalName = `${base}-${Date.now()}${ext}`;
      dest = path.join(destDir, finalName);
    } catch {
      // pas de collision
    }

    await fs.rename(src, dest);

    return NextResponse.json({
      ok: true,
      file: finalName,
      to,
      url: `${PUBLIC_PREFIX}/${to}/${finalName}`,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}

// PUT : crée une nouvelle catégorie (dossier)
// body: { name }
export async function PUT(request) {
  try {
    const body = await request.json();
    const name = safeCategory(body.name);
    if (!name) {
      return NextResponse.json({ error: 'Nom de catégorie invalide (a-z 0-9 - _)' }, { status: 400 });
    }
    const dir = path.join(MEDIA_ROOT, name);
    try {
      await fs.access(dir);
      return NextResponse.json({ error: `La catégorie « ${name} » existe déjà` }, { status: 409 });
    } catch {
      // n'existe pas → on peut créer
    }
    await fs.mkdir(dir, { recursive: true });
    return NextResponse.json({ ok: true, name });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}

// DELETE : supprime un média
// body: { file, category }
export async function DELETE(request) {
  try {
    const body = await request.json();
    const file = safeFile(body.file);
    const category = safeCategory(body.category);
    if (!file || !category) {
      return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400 });
    }
    const target = path.join(MEDIA_ROOT, category, file);
    try {
      await fs.access(target);
    } catch {
      return NextResponse.json({ error: 'Fichier introuvable' }, { status: 404 });
    }
    await fs.unlink(target);
    return NextResponse.json({ ok: true, file, category });
  } catch (err) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
  }
}

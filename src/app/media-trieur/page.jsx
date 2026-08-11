'use client';

import { useEffect, useState, useCallback } from 'react';

const ORANGE = '#B03E00';
const ORANGE_LIGHT = '#c2622a';
const COCOCO = '#C0C0C0';
const LAVANDE = '#acb0cd';
const BG = '#26272a';
const BG2 = '#2e2f32';
const CARD = '#3a3b3f';

export default function MediaTrieurPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null); // catégorie affichée
  const [kindFilter, setKindFilter] = useState('all'); // all | image | video
  const [busy, setBusy] = useState({}); // file -> true pendant déplacement
  const [toast, setToast] = useState(null);
  const [zoom, setZoom] = useState(null); // url en plein écran

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/media-trieur', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setCategories(data.categories);
      setActive((prev) => prev || (data.categories[0]?.name ?? null));
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const move = async (file, from, to) => {
    if (from === to) return;
    setBusy((b) => ({ ...b, [file]: true }));
    try {
      const res = await fetch('/api/media-trieur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file, from, to }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');

      // MàJ locale sans recharger tout
      setCategories((cats) =>
        cats.map((c) => {
          if (c.name === from) {
            const items = c.items.filter((it) => it.file !== file);
            return { ...c, items, count: items.length };
          }
          if (c.name === to) {
            const items = [
              ...c.items,
              { file: data.file, kind: kindFromName(data.file), url: data.url },
            ].sort((a, b) => a.file.localeCompare(b.file));
            return { ...c, items, count: items.length };
          }
          return c;
        })
      );
      flash(`Déplacé vers « ${to} »`);
    } catch (e) {
      flash(`❌ ${e.message}`);
    } finally {
      setBusy((b) => {
        const n = { ...b };
        delete n[file];
        return n;
      });
    }
  };

  const createCategory = async () => {
    const raw = window.prompt('Nom de la nouvelle catégorie (a-z, 0-9, - ou _) :');
    if (!raw) return;
    const name = raw.trim().toLowerCase();
    try {
      const res = await fetch('/api/media-trieur', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setCategories((cats) =>
        [...cats, { name: data.name, count: 0, items: [] }].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      );
      setActive(data.name);
      flash(`Catégorie « ${data.name} » créée`);
    } catch (e) {
      flash(`❌ ${e.message}`);
    }
  };

  const remove = async (file, category) => {
    if (!window.confirm(`Supprimer définitivement « ${file} » ?`)) return;
    setBusy((b) => ({ ...b, [file]: true }));
    try {
      const res = await fetch('/api/media-trieur', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file, category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      setCategories((cats) =>
        cats.map((c) => {
          if (c.name !== category) return c;
          const items = c.items.filter((it) => it.file !== file);
          return { ...c, items, count: items.length };
        })
      );
      flash('Média supprimé');
    } catch (e) {
      flash(`❌ ${e.message}`);
    } finally {
      setBusy((b) => {
        const n = { ...b };
        delete n[file];
        return n;
      });
    }
  };

  const activeCat = categories.find((c) => c.name === active);
  const visibleItems = (activeCat?.items || []).filter((it) =>
    kindFilter === 'all' ? true : it.kind === kindFilter
  );
  const total = categories.reduce((s, c) => s + c.count, 0);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: LAVANDE, fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '24px 28px 16px', borderBottom: `1px solid ${CARD}`, background: BG2 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: LAVANDE, margin: 0 }}>
          Trieur de médias
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 13, opacity: 0.75 }}>
          {total} fichiers · {categories.length} catégories · les déplacements modifient les fichiers dans <code>public/media/quality/</code>
        </p>
      </header>

      {loading && <div style={{ padding: 40 }}>Chargement…</div>}
      {error && (
        <div style={{ padding: 40, color: ORANGE_LIGHT }}>
          Erreur : {error}
          <button onClick={load} style={btnStyle()}>Réessayer</button>
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 90px)' }}>
          {/* Sidebar catégories */}
          <aside style={{ width: 220, flexShrink: 0, borderRight: `1px solid ${CARD}`, background: BG2, padding: 12, overflowY: 'auto' }}>
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => setActive(c.name)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  width: '100%', textAlign: 'left', padding: '9px 12px', marginBottom: 4,
                  borderRadius: 8, cursor: 'pointer', fontSize: 14,
                  border: `1px solid ${active === c.name ? ORANGE : 'transparent'}`,
                  background: active === c.name ? 'rgba(176,62,0,0.15)' : 'transparent',
                  color: active === c.name ? ORANGE_LIGHT : LAVANDE,
                }}
              >
                <span style={{ textTransform: 'capitalize' }}>{c.name}</span>
                <span style={{ fontSize: 12, opacity: 0.6 }}>{c.count}</span>
              </button>
            ))}
            <button
              onClick={createCategory}
              style={{
                width: '100%', textAlign: 'left', padding: '9px 12px', marginTop: 8,
                borderRadius: 8, cursor: 'pointer', fontSize: 14,
                border: `1px dashed ${COCOCO}`, background: 'transparent', color: ORANGE_LIGHT,
              }}
            >
              + Nouvelle catégorie
            </button>
          </aside>

          {/* Galerie */}
          <main style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
            {/* Barre filtres */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, alignItems: 'center' }}>
              {['all', 'image', 'video'].map((k) => (
                <button
                  key={k}
                  onClick={() => setKindFilter(k)}
                  style={pillStyle(kindFilter === k)}
                >
                  {k === 'all' ? 'Tout' : k === 'image' ? 'Photos' : 'Vidéos'}
                </button>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: 13, opacity: 0.7 }}>
                {visibleItems.length} affichés dans « {active} »
              </span>
            </div>

            {visibleItems.length === 0 && (
              <p style={{ opacity: 0.6 }}>Aucun média dans cette vue.</p>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: 16,
            }}>
              {visibleItems.map((it) => (
                <div key={it.file} style={{
                  background: CARD, borderRadius: 12, overflow: 'hidden',
                  border: `1px solid rgba(192,192,192,0.15)`,
                  opacity: busy[it.file] ? 0.5 : 1,
                }}>
                  <div
                    onClick={() => setZoom(it)}
                    style={{ position: 'relative', height: 150, background: '#000', cursor: 'zoom-in' }}
                  >
                    {it.kind === 'image' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.url} alt={it.file} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    ) : (
                      <video src={it.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted playsInline preload="metadata" />
                    )}
                    <span style={{
                      position: 'absolute', top: 6, left: 6, fontSize: 10, padding: '2px 7px',
                      borderRadius: 20, background: 'rgba(0,0,0,0.6)', color: it.kind === 'video' ? ORANGE_LIGHT : COCOCO,
                    }}>
                      {it.kind === 'video' ? '▶ vidéo' : 'photo'}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); remove(it.file, active); }}
                      disabled={busy[it.file]}
                      title="Supprimer"
                      style={{
                        position: 'absolute', top: 6, right: 6, width: 24, height: 24,
                        borderRadius: '50%', cursor: 'pointer', fontSize: 13, lineHeight: 1,
                        border: `1px solid ${COCOCO}`, background: 'rgba(0,0,0,0.6)', color: COCOCO,
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <div style={{ padding: 10 }}>
                    <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 8, wordBreak: 'break-all' }} title={it.file}>
                      {it.file.length > 34 ? it.file.slice(0, 31) + '…' : it.file}
                    </div>
                    <div style={{ fontSize: 11, opacity: 0.55, marginBottom: 4 }}>Déplacer vers :</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {categories
                        .filter((c) => c.name !== active)
                        .map((c) => (
                          <button
                            key={c.name}
                            disabled={busy[it.file]}
                            onClick={() => move(it.file, active, c.name)}
                            style={moveBtnStyle()}
                            title={`Déplacer vers ${c.name}`}
                          >
                            {c.name}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: BG2, border: `1px solid ${ORANGE}`, color: LAVANDE,
          padding: '10px 20px', borderRadius: 10, fontSize: 14, zIndex: 100,
          boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
        }}>
          {toast}
        </div>
      )}

      {/* Zoom plein écran */}
      {zoom && (
        <div
          onClick={() => setZoom(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: 30,
          }}
        >
          {zoom.kind === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={zoom.url} alt={zoom.file} style={{ maxWidth: '95%', maxHeight: '95%', objectFit: 'contain' }} />
          ) : (
            <video src={zoom.url} style={{ maxWidth: '95%', maxHeight: '95%' }} controls autoPlay />
          )}
        </div>
      )}
    </div>
  );
}

function kindFromName(file) {
  const ext = file.slice(file.lastIndexOf('.')).toLowerCase();
  return ['.mp4', '.webm', '.mov', '.m4v'].includes(ext) ? 'video' : 'image';
}

function btnStyle() {
  return {
    marginLeft: 12, padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
    background: 'transparent', color: ORANGE_LIGHT, border: `1px solid ${COCOCO}`,
  };
}

function pillStyle(activeState) {
  return {
    padding: '6px 16px', borderRadius: 20, cursor: 'pointer', fontSize: 13,
    border: `1px solid ${activeState ? ORANGE : COCOCO}`,
    background: activeState ? 'rgba(176,62,0,0.15)' : 'transparent',
    color: activeState ? ORANGE_LIGHT : LAVANDE,
  };
}

function moveBtnStyle() {
  return {
    padding: '3px 9px', borderRadius: 14, cursor: 'pointer', fontSize: 11,
    textTransform: 'capitalize',
    border: `1px solid ${COCOCO}`, background: 'transparent', color: LAVANDE,
    transition: 'all 0.15s',
  };
}

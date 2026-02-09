// API route pour proxy les images Ankor (évite les problèmes CORS)
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'URL manquante' }, { status: 400 });
  }

  try {
    // Fetch l'image depuis Ankor (côté serveur = pas de CORS)
    const response = await fetch(imageUrl, {
      headers: {
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Erreur fetch image: ${response.status}` },
        { status: response.status }
      );
    }

    // Récupérer le blob de l'image
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Retourner l'image avec les bons headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache 24h
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Erreur proxy image:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error.message },
      { status: 500 }
    );
  }
}

'use client';
import { useState, useEffect } from 'react';

const BACKGROUND_COLOR = '#24445c';

// Cache en mémoire pour éviter re-fetch DB
const processedImageCache = new Map();

/**
 * Hook pour utiliser une image hero détourée.
 * 1. Si savedUrl fourni (depuis DB) → l'utilise directement
 * 2. Sinon traite côté client → sauvegarde en DB pour la prochaine fois
 */
export function useBackgroundRemoval(imageUrl, enabled = true, yachtId = null, savedUrl = null) {
  const [processedUrl, setProcessedUrl] = useState(savedUrl || null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si on a déjà une URL sauvegardée (DB), l'utiliser directement
    if (savedUrl) {
      setProcessedUrl(savedUrl);
      processedImageCache.set(imageUrl, savedUrl);
      return;
    }

    if (!imageUrl || !enabled) {
      setProcessedUrl(null);
      return;
    }

    // Vérifier le cache mémoire
    if (processedImageCache.has(imageUrl)) {
      setProcessedUrl(processedImageCache.get(imageUrl));
      return;
    }

    let cancelled = false;

    async function processImage() {
      setIsProcessing(true);
      setError(null);

      try {
        console.log('[BG-Removal] Démarrage pour:', imageUrl.substring(0, 50) + '...');

        const { removeBackground } = await import('@imgly/background-removal');

        // Fetch via proxy pour éviter CORS
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Impossible de charger l\'image via proxy');

        const blob = await response.blob();
        console.log('[BG-Removal] Image récupérée, taille:', blob.size, 'type:', blob.type);

        if (cancelled) return;

        // Convertir AVIF/WebP en PNG car imgly ne supporte pas ces formats
        let inputBlob = blob;
        if (blob.type === 'image/avif' || blob.type === 'image/webp' || !blob.type.startsWith('image/jpeg') && !blob.type.startsWith('image/png')) {
          console.log('[BG-Removal] Conversion', blob.type, '→ PNG...');
          const tempImg = new Image();
          const tempUrl = URL.createObjectURL(blob);
          await new Promise((resolve, reject) => {
            tempImg.onload = resolve;
            tempImg.onerror = reject;
            tempImg.src = tempUrl;
          });
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = tempImg.width;
          tempCanvas.height = tempImg.height;
          tempCanvas.getContext('2d').drawImage(tempImg, 0, 0);
          URL.revokeObjectURL(tempUrl);
          inputBlob = await new Promise(resolve => tempCanvas.toBlob(resolve, 'image/png'));
          console.log('[BG-Removal] Converti en PNG, taille:', inputBlob.size);
        }

        if (cancelled) return;

        // Supprimer le fond
        console.log('[BG-Removal] Lancement removeBackground...');
        const resultBlob = await removeBackground(inputBlob, {
          model: 'small',
          output: { format: 'image/png' },
        });
        console.log('[BG-Removal] Détourage terminé, résultat:', resultBlob.size, 'bytes');

        if (cancelled) return;

        // Ajouter le fond bleu via canvas
        const img = new Image();
        const objectUrl = URL.createObjectURL(resultBlob);
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = objectUrl;
        });

        if (cancelled) { URL.revokeObjectURL(objectUrl); return; }

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const finalUrl = canvas.toDataURL('image/jpeg', 0.85);
        URL.revokeObjectURL(objectUrl);

        if (!cancelled) {
          processedImageCache.set(imageUrl, finalUrl);
          setProcessedUrl(finalUrl);
          console.log('[BG-Removal] Image traitée avec succès');

          // Sauvegarder en DB si on a un yachtId
          if (yachtId) {
            saveToDb(yachtId, finalUrl);
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[BG-Removal] Erreur:', err.message);
          setError(err);
        }
      } finally {
        if (!cancelled) setIsProcessing(false);
      }
    }

    processImage();
    return () => { cancelled = true; };
  }, [imageUrl, enabled, savedUrl]);

  return { processedUrl, isProcessing, error };
}

/**
 * Sauvegarde silencieuse en DB (fire & forget)
 */
async function saveToDb(yachtId, dataUrl) {
  try {
    const res = await fetch(`/api/admin/yachts/processed-hero?token=${getAdminToken()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yacht_id: yachtId, processed_hero: dataUrl }),
    });
    if (res.ok) {
      console.log('[BG-Removal] Sauvegardé en DB pour', yachtId);
    }
  } catch (err) {
    console.warn('[BG-Removal] Échec sauvegarde DB:', err.message);
  }
}

/**
 * Récupère le token admin depuis l'URL (page admin)
 */
function getAdminToken() {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get('token') || '';
  }
  return '';
}

/**
 * Charge les images hero détourées depuis la DB
 * Retourne un Map { yacht_id → data_url }
 */
export async function fetchProcessedHeroes() {
  try {
    const res = await fetch('/api/admin/yachts/processed-hero');
    if (!res.ok) return {};
    const data = await res.json();
    // Pré-remplir le cache mémoire
    if (data.heroes) {
      Object.entries(data.heroes).forEach(([id, url]) => {
        processedImageCache.set(id, url);
      });
    }
    return data.heroes || {};
  } catch {
    return {};
  }
}

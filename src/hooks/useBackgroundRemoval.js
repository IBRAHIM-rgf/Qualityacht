'use client';
import { useState, useEffect } from 'react';

const BACKGROUND_COLOR = '#24445c';
const LS_PREFIX = 'yacht-hero-';

// Cache mémoire (session courante)
const memoryCache = new Map();

/**
 * Lit le cache localStorage
 */
function getFromLS(yachtId) {
  if (!yachtId || typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(LS_PREFIX + yachtId);
  } catch {
    return null;
  }
}

/**
 * Sauve dans localStorage
 */
function saveToLS(yachtId, dataUrl) {
  if (!yachtId || typeof window === 'undefined') return;
  try {
    localStorage.setItem(LS_PREFIX + yachtId, dataUrl);
  } catch {
    // localStorage plein → vider les anciennes entrées yacht-hero-*
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(LS_PREFIX)) keys.push(k);
      }
      keys.slice(0, Math.ceil(keys.length / 2)).forEach(k => localStorage.removeItem(k));
      localStorage.setItem(LS_PREFIX + yachtId, dataUrl);
    } catch {}
  }
}

/**
 * Hook pour image hero détourée.
 * Priorité : DB (savedUrl) → mémoire → localStorage → traitement client
 * Après traitement : sauvegarde DB + localStorage + mémoire
 */
export function useBackgroundRemoval(imageUrl, enabled = true, yachtId = null, savedUrl = null) {
  const [processedUrl, setProcessedUrl] = useState(() => {
    if (savedUrl) return savedUrl;
    if (imageUrl && memoryCache.has(imageUrl)) return memoryCache.get(imageUrl);
    if (yachtId) return getFromLS(yachtId);
    return null;
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. DB → direct
    if (savedUrl) {
      setProcessedUrl(savedUrl);
      if (imageUrl) memoryCache.set(imageUrl, savedUrl);
      if (yachtId) saveToLS(yachtId, savedUrl);
      return;
    }

    if (!imageUrl || !enabled) {
      setProcessedUrl(null);
      return;
    }

    // 2. Cache mémoire
    if (memoryCache.has(imageUrl)) {
      setProcessedUrl(memoryCache.get(imageUrl));
      return;
    }

    // 3. Cache localStorage
    if (yachtId) {
      const cached = getFromLS(yachtId);
      if (cached) {
        setProcessedUrl(cached);
        memoryCache.set(imageUrl, cached);
        return;
      }
    }

    // 4. Traitement client-side
    let cancelled = false;

    async function processImage() {
      setIsProcessing(true);
      setError(null);

      try {
        console.log('[BG-Removal] Traitement:', yachtId || imageUrl.substring(0, 50));

        const { removeBackground } = await import('@imgly/background-removal');

        // Fetch via proxy CORS
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Impossible de charger l\'image via proxy');

        const blob = await response.blob();
        if (cancelled) return;

        // Convertir AVIF/WebP → PNG (imgly ne supporte pas ces formats)
        let inputBlob = blob;
        if (blob.type === 'image/avif' || blob.type === 'image/webp' || (!blob.type.startsWith('image/jpeg') && !blob.type.startsWith('image/png'))) {
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
        }

        if (cancelled) return;

        // Supprimer le fond
        const resultBlob = await removeBackground(inputBlob, {
          model: 'small',
          output: { format: 'image/png' },
        });

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
          // Sauvegarder partout : mémoire + localStorage + DB
          memoryCache.set(imageUrl, finalUrl);
          if (yachtId) saveToLS(yachtId, finalUrl);
          setProcessedUrl(finalUrl);
          console.log('[BG-Removal] Traité et mis en cache:', yachtId);

          // Sauvegarder en DB (fire & forget, sans auth)
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
  }, [imageUrl, enabled, savedUrl, yachtId]);

  return { processedUrl, isProcessing, error };
}

/**
 * Sauvegarde en DB (sans token admin)
 */
async function saveToDb(yachtId, dataUrl) {
  try {
    const res = await fetch('/api/admin/yachts/processed-hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yacht_id: yachtId, processed_hero: dataUrl }),
    });
    if (res.ok) {
      console.log('[BG-Removal] Sauvegardé en DB pour', yachtId);
    } else {
      console.warn('[BG-Removal] DB save failed:', res.status);
    }
  } catch (err) {
    console.warn('[BG-Removal] Échec sauvegarde DB:', err.message);
  }
}

/**
 * Charge les images hero détourées depuis la DB
 */
export async function fetchProcessedHeroes() {
  try {
    const res = await fetch('/api/admin/yachts/processed-hero');
    if (!res.ok) return {};
    const data = await res.json();
    if (data.heroes) {
      Object.entries(data.heroes).forEach(([id, url]) => {
        memoryCache.set(id, url);
      });
    }
    return data.heroes || {};
  } catch {
    return {};
  }
}

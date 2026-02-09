'use client';
import { useState, useEffect } from 'react';

const BACKGROUND_COLOR = '#24445c';

// Cache en mémoire pour éviter re-traitement
const processedImageCache = new Map();

/**
 * Hook pour supprimer l'arrière-plan d'une image et ajouter un fond bleu
 * Utilise @imgly/background-removal (traitement côté client)
 */
export function useBackgroundRemoval(imageUrl, enabled = true) {
  const [processedUrl, setProcessedUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageUrl || !enabled) {
      setProcessedUrl(null);
      return;
    }

    // Vérifier le cache
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

        // Import dynamique pour éviter le chargement initial (30MB de modèle)
        console.log('[BG-Removal] Import du module imgly...');
        const { removeBackground } = await import('@imgly/background-removal');
        console.log('[BG-Removal] Module importé avec succès');

        // Utiliser le proxy pour éviter les erreurs CORS avec les images Ankor
        const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
        console.log('[BG-Removal] Fetch via proxy...');
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

        // Supprimer le fond avec le modèle small (plus rapide et plus stable)
        console.log('[BG-Removal] Lancement removeBackground...');
        const resultBlob = await removeBackground(inputBlob, {
          model: 'small',
          output: {
            format: 'image/png',
          },
        });
        console.log('[BG-Removal] Détourage terminé, résultat:', resultBlob.size, 'bytes');

        if (cancelled) return;

        // Créer canvas pour ajouter le fond bleu
        const img = new Image();
        const objectUrl = URL.createObjectURL(resultBlob);

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = objectUrl;
        });

        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        // Dessiner le fond bleu
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner le yacht détouré par-dessus
        ctx.drawImage(img, 0, 0);

        // Convertir en data URL (JPEG pour réduire la taille)
        const finalUrl = canvas.toDataURL('image/jpeg', 0.9);

        URL.revokeObjectURL(objectUrl);

        if (!cancelled) {
          // Mettre en cache
          processedImageCache.set(imageUrl, finalUrl);
          setProcessedUrl(finalUrl);
          console.log('[BG-Removal] ✅ Succès! Image mise en cache');
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[BG-Removal] ❌ Erreur:', err.message);
          console.error('[BG-Removal] Stack:', err.stack);
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setIsProcessing(false);
        }
      }
    }

    processImage();

    return () => {
      cancelled = true;
    };
  }, [imageUrl, enabled]);

  return { processedUrl, isProcessing, error };
}

/**
 * Vide le cache des images traitées
 */
export function clearBackgroundRemovalCache() {
  processedImageCache.clear();
}

/**
 * Vérifie si une image est déjà en cache
 */
export function isImageCached(imageUrl) {
  return processedImageCache.has(imageUrl);
}

'use client';
import { useState } from 'react';
import { useBackgroundRemoval } from '@/hooks/useBackgroundRemoval';
import { Loader2 } from 'lucide-react';

/**
 * Composant image avec détourage automatique et fond bleu #24445c
 * Affiche un loader pendant le traitement, puis l'image détourée
 * Fallback sur l'image originale en cas d'erreur
 */
export default function ProcessedYachtImage({
  src,
  alt,
  className = '',
  enableProcessing = true,
  showLoader = true,
  loaderClassName = '',
}) {
  const { processedUrl, isProcessing, error } = useBackgroundRemoval(src, enableProcessing);
  const [imgError, setImgError] = useState(false);

  // Afficher l'image traitée si disponible, sinon l'originale
  const displayUrl = (processedUrl && !imgError) ? processedUrl : src;

  return (
    <div className="relative w-full h-full">
      <img
        src={displayUrl}
        alt={alt}
        className={className}
        onError={() => setImgError(true)}
      />

      {/* Indicateur de chargement pendant le détourage */}
      {isProcessing && showLoader && (
        <div className={`absolute inset-0 flex items-center justify-center bg-[#24445c]/80 ${loaderClassName}`}>
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
            <span className="text-white text-xs">Traitement...</span>
          </div>
        </div>
      )}

      {/* Indicateur d'erreur (optionnel, pour debug) */}
      {error && !imgError && (
        <div className="absolute bottom-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded">
          Erreur détourage
        </div>
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';
import { useBackgroundRemoval } from '@/hooks/useBackgroundRemoval';
import { Loader2 } from 'lucide-react';

/**
 * Composant image avec détourage automatique et fond bleu #24445c
 * Si savedProcessedUrl fourni (depuis DB), l'affiche directement sans traitement
 * Sinon traite côté client et sauvegarde en DB pour la prochaine fois
 */
export default function ProcessedYachtImage({
  src,
  alt,
  className = '',
  enableProcessing = true,
  showLoader = true,
  loaderClassName = '',
  yachtId = null,
  savedProcessedUrl = null,
}) {
  const { processedUrl, isProcessing, error } = useBackgroundRemoval(
    src, enableProcessing, yachtId, savedProcessedUrl
  );
  const [imgError, setImgError] = useState(false);

  const displayUrl = (processedUrl && !imgError) ? processedUrl : src;

  return (
    <div className="relative w-full h-full">
      <img
        src={displayUrl}
        alt={alt}
        className={className}
        onError={() => setImgError(true)}
      />

      {isProcessing && showLoader && (
        <div className={`absolute inset-0 flex items-center justify-center bg-[#24445c]/80 ${loaderClassName}`}>
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
            <span className="text-white text-xs">Traitement...</span>
          </div>
        </div>
      )}

      {error && !imgError && (
        <div className="absolute bottom-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded">
          Erreur détourage
        </div>
      )}
    </div>
  );
}

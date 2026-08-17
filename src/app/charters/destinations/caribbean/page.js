// Page Caraïbes canonique — réutilise le rendu de caribbean-v15
// (les nombreuses variantes v2..v15 restent disponibles pour comparaison interne).
// showShowcase : remplace le bandeau cocomer par la section "cartes flottantes"
// (reproduction de l'animation alethia.earth). Actif UNIQUEMENT ici — la route
// /caribbean-v15 et la page halal gardent le cocomer (zéro régression).
import CaribbeanV15Page from '../caribbean-v15/CaribbeanV15Base';

export default function CaribbeanPage() {
  return <CaribbeanV15Page showShowcase />;
}

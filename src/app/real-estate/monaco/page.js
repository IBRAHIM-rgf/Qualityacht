// Page ouverte par le bouton vert « Selection MONACO » de la carte Balkin
// (/real-estate). Contenu (client 2026-09-30) : voir MonacoSelectionClient.
import MonacoSelectionClient from './MonacoSelectionClient';

export const metadata = {
  title: 'Monaco Private Residences | Qualityacht',
  description:
    'A private selection of two Monaco residences, carefully chosen from the portfolio of Balkin Monaco Real Estate.',
};

export default function MonacoSelectionPage() {
  return <MonacoSelectionClient />;
}

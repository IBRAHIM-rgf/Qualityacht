import VideoHero from '@/components/vibe/VideoHero';

// Page ouverte par le bouton vert « Selection MONACO » de la carte Balkin
// (/real-estate) — client 2026-09-29 : hero video Monaco + titre.
const D = '/media/client/lydie/2026-09-29';

export const metadata = {
  title: 'Selection Monaco | Qualityacht',
};

export default function MonacoSelectionPage() {
  return (
    <main className="bg-[#26272a]">
      <VideoHero
        videoLandscape={`${D}/monaco-hero.mp4`}
        posterLandscape={`${D}/monaco-hero.jpg`}
        title="Selection Monaco"
        align="center"
      />
    </main>
  );
}

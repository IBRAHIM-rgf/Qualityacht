import { seo } from '@/lib/seoMeta';
import { Suspense } from 'react';
import RequestQuoteWizard from './RequestQuoteWizard';


// Titre et description Google (SEO etape 3, client 2026-11-01).
export const metadata = seo('/request-quote-test-v10');
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#26272a]" />}>
      <RequestQuoteWizard />
    </Suspense>
  );
}

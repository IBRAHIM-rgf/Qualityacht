import { Suspense } from 'react';
import RequestQuoteWizard from './RequestQuoteWizard';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#26272a]" />}>
      <RequestQuoteWizard />
    </Suspense>
  );
}

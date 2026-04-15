import { AnalyzePageClient } from '@/components/AnalyzePageClient';
import { Suspense } from 'react';

export default function AnalyzePage() {
  return (
    <Suspense fallback={null}>
      <AnalyzePageClient />
    </Suspense>
  );
}

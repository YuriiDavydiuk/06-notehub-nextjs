import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { getNotes } from '@/lib/api';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Prefetch першої сторінки без пошуку
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => getNotes(1, ''),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

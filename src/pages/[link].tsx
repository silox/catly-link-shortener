import { useRouter } from 'next/router';
import { ShortenerTemplate } from '../components/templates';

export default function ShortenerPage() {
  const router = useRouter();
  const slug = router.query.link as string;

  return (
    <ShortenerTemplate slug={slug} />
  );
}

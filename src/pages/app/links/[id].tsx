import { useRouter } from 'next/router';
import { LinkDetailTemplate } from '../../../components/templates';
import { AuthenticationRequired, PageTitle } from '../../../components/utils';

export default function LinkDetail() {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <PageTitle title="Edit link" />
      <AuthenticationRequired>
        <LinkDetailTemplate linkId={id} />
      </AuthenticationRequired>
    </>
  );
}

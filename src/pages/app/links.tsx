import { LinkListTemplate } from '../../components/templates';
import { AuthenticationRequired, PageTitle } from '../../components/utils';

export default function LinkList() {
  return (
    <>
      <PageTitle title="Link list" />
      <AuthenticationRequired>
        <LinkListTemplate />
      </AuthenticationRequired>
    </>
  );
}

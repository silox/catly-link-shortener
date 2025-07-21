import { ItemBox, TitleLabel } from '../atoms';
import { BoxElement } from '../molecules';
import { PageTitle } from '../utils';

export interface NotFoundTemplateProps {
  title: string;
}

export default function NotFoundTemplate({
  title,
}: NotFoundTemplateProps) {
  return (
    <>
      <PageTitle title="Not Found" />
      <TitleLabel title="Not Found" variant="h4" />
      <div className="md:flex md:justify-center">
        <div className="flex md:w-1/2 flex-col my-6">
          <ItemBox>
            <BoxElement title={title}>
              <div />
            </BoxElement>
          </ItemBox>
        </div>
      </div>
    </>
  );
}

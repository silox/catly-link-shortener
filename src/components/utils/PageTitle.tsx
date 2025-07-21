import Head from 'next/head';

export interface PageTitleProps {
  title: string;
}

export default function PageTitle({
  title,
}: PageTitleProps) {
  return (
    <Head>
      <title>{`${title} | Catly `}</title>
    </Head>
  );
}

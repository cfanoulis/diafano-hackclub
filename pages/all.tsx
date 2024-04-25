import { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { BankOrg } from '../hackbank';
import { getBankData } from '../lib/fetch';
import Link from 'next/link';
import InfiniteProjects from '../components/InfiniteProjects';
import Layout from '../components/Layout';

export default function Home({ initData }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Layout>
			<Link href="/">you&apos;re viewing all projects. click here to filter back to non-grant projects</Link>
			<InfiniteProjects initData={initData} showAll={true} />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<{ initData: BankOrg[] }> = async () => {
	const initData = await getBankData(1, 100, true); // so we start from page 3 :)
	return { props: { initData } };
};

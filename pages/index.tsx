import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import type { BankOrg } from '../hackbank';
import { getBankData } from '../lib/fetch';
import styles from '../styles/index.module.css';
import Link from 'next/link';
import InfiniteProjects from '../components/InfiniteProjects';
import Layout from '../components/Layout';

export default function Home({ initData }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Layout>
			<Link href="/">click here to view all projects :)</Link>
			<InfiniteProjects initData={initData} showAll={false} />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps<{ initData: BankOrg[] }> = async () => {
	const initData = await getBankData(1, 100, false); // so we start from page 3 :)
	return { props: { initData } };
};

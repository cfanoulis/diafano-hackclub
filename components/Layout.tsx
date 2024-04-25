import Head from 'next/head';
import styles from '../styles/index.module.css';


export default function Layout({children}: {children: React.ReactNode}) {
	return (
		<>
		<Head>
			<title>Diafano - HCB&apos;s directory</title>
			<meta name="description" content="A directory of all Hack Club Bank projects that have enabled super-transparency" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.png" />
		</Head>
		<main className={styles.main}>
			<h1 className={`${styles.title} title`}>
				These cool projects use{' '}
				<a className={styles.gradient} href="https://hackclub.com/bank?ref=diafano">
					Hack Club Bank
				</a>
				:
			</h1>
			{children}
			<footer className={styles.footer}>
				char made this; and it&apos;s <a href="https://github.com/cfanoulis/diafano-hackclub">open-source</a>
			</footer>
		</main>
	</>
	);
}
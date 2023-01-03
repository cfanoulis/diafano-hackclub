import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image.js";
import { BankOrg } from "../hackbank.js";
import styles from "../styles/index.module.css";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({
  d,
  err,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Diafano - HCB&apos;s directory</title>
        <meta
          name="description"
          content="A directory of all Hack Club Bank projects that have enabled super-transparency"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={`${styles.title} title`}>
          These cool projects use{" "}
          <span className={styles.gradient}>Hack Club Bank</span>:
        </h1>
        <div className={styles.flex}>
          {err ??
            d.map((k: Record<string, string>) => (
              <a
                href={`https://bank.hackclub.com/${k.slug}`}
                className={`card interactive ${styles.card}`}
                key={k.id}
              >
                <Image
                  alt={`${k.name}'s logo`}
                  src={
                    k.logo ??
                    "https://bank.hackclub.com/brand/hcb-icon-icon-dark.svg"
                  }
                  style={{ marginRight: "8px" }}
                  height={32}
                  width={32}
                ></Image>
                <span>{k.name}</span>
              </a>
            ))}
        </div>
        <footer className={styles.footer}>
          char made this; and it&apos;s{" "}
          <a href="https://github.com/cfanoulis/diafano-hackclub">
            open-source
          </a>
        </footer>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const getOrgsReq = await fetch(
    "https://bank.hackclub.com/api/v3/organizations"
  );
  if (!getOrgsReq.ok)
    return { props: { err: "Couldn't fetch orgs from da hack bank" } };
  const d = ((await getOrgsReq.json()) as BankOrg[]).map(
    ({ id, name, slug, logo }) => ({
      id,
      name,
      slug,
      logo,
    })
  );
  return {
    props: { d }, // will be passed to the page component as props
    revalidate: 2 * 60 * 60, // 2 hours
  };
};

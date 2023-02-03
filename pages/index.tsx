import Head from "next/head";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { ProjectCard } from "../components/ProjectCard";
import type { BankOrg } from "../hackbank";
import styles from "../styles/index.module.css";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [projects, setProjects] = useState<BankOrg[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isFull, setFull] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const fetchItems = useCallback(async () => {
    if (isLoading || isFull) {
      return;
    }

    setLoading(true);

    try {
      const getOrgsReq = await fetch(
        `https://bank.hackclub.com/api/v3/organizations?page=${pageNum}&per_page=35`
      );

      if (!getOrgsReq.ok) throw "Couldn't fetch orgs from da hack bank";

      const d = ((await getOrgsReq.json()) as BankOrg[]).map(
        ({ id, name, slug, logo }) => ({
          id,
          name,
          slug,
          logo,
        })
      );

      if (d.length < 1) setFull(true);

      setProjects([...projects, ...d]);
      setPageNum(pageNum + 1);
    } finally {
      setLoading(false);
    }
  }, [projects, isLoading, pageNum, isFull]);

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
          <a
            className={styles.gradient}
            href="https://hackclub.com/bank?ref=diafano"
          >
            Hack Club Bank
          </a>
          :
        </h1>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchItems}
          hasMore={!isFull}
          loader={
            <div className={styles.footer} key={0}>
              putting the ack in Bank...
            </div>
          }
        >
          <div className={styles.flex}>
            {projects.map((k: BankOrg) => (
              <ProjectCard key={k.id} data={k} />
            ))}
          </div>
        </InfiniteScroll>
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

import { useCallback, useState } from "react";
import { BankOrg } from "../hackbank";
import { getBankData } from "../lib/fetch";
import { ProjectCard } from "./ProjectCard";
import styles from '../styles/index.module.css';
import InfiniteScroll from "react-infinite-scroller";


export default function InfiniteProjects({initData, showAll}: {initData: BankOrg[], showAll: boolean}) {

	const [projects, setProjects] = useState<BankOrg[]>(initData);
	const [isLoading, setLoading] = useState(false);
	const [isFull, setFull] = useState(false);
	const [pageNum, setPageNum] = useState(3);

	const fetchItems = useCallback(async () => {
		if (isLoading || isFull) {
			return;
		}

		setLoading(true);

		try {
			const d = await getBankData(pageNum, showAll ? 50 : 100, showAll);

			if (d.length < 1) setFull(true);

			setProjects([...projects, ...d]);
			showAll ? setPageNum(pageNum + 1) : setPageNum(pageNum + 2); //every page is 50, so we need to jump 2 pages for 100.
		} finally {
			setLoading(false);
		}
	}, [projects, isLoading, pageNum, isFull, showAll]);

	return (
	<InfiniteScroll
		loadMore={fetchItems}
		hasMore={!isFull}
		loader={
			(<div className={styles.footer} key={0}>
				putting the ack in Bank...
			</div>)
		}
	>
		<div className={styles.flex}>
			{projects.map((k: BankOrg) => (
				<ProjectCard key={k.id} data={k} />
			))}
		</div>
	</InfiniteScroll>
);
};
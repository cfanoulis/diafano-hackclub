import type { BankOrg } from '../hackbank';

const allowedProjectTypes = ["hackathon", "hackclub", "nonprofit", "event", "high_school_hackathon", "robotics_team", "hack_club_hq", "ai"];

export async function getBankData(page: number, page_size = 50, showAll = false) {
	const getOrgsReq = await fetch(
		`https://bank.hackclub.com/api/v3/organizations?page=${page}&per_page=${page_size}&suppose_this_is_a_useragent=diafano_by_charalampos`
	);

	if (!getOrgsReq.ok) throw "Couldn't fetch orgs from da hack bank";

	const data = ((await getOrgsReq.json()) as BankOrg[])
		.filter(e => showAll || (allowedProjectTypes.includes(e.category) && !e.demo_mode))
		.map(({ id, name, slug, logo }) => ({
		id,
		name,
		slug,
		logo
	}));

	return data;
}

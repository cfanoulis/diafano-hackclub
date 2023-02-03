import type { BankOrg } from '../hackbank';

export async function getBankData(page: number, page_size = 50) {
	const getOrgsReq = await fetch(
		`https://bank.hackclub.com/api/v3/organizations?page=${page}&per_page=${page_size}&suppose_this_is_a_useragent=diafano_by_charalampos`
	);

	if (!getOrgsReq.ok) throw "Couldn't fetch orgs from da hack bank";

	const data = ((await getOrgsReq.json()) as BankOrg[]).map(({ id, name, slug, logo }) => ({
		id,
		name,
		slug,
		logo
	}));

	return data;
}

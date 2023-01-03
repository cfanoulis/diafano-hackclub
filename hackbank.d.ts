export interface BankOrg {
  id: string;
  object: string;
  href: string;
  name: string;
  slug: string;
  transparent: boolean;
  logo: string;
  public_message: string;
  balances: Balances;
  created_at: string;
  users: User[];
}

export interface Balances {
  balance_cents: number;
  fee_balance_cents: number;
  incoming_balance_cents: number;
}

export interface User {
  id: string;
  object: string;
  full_name: string;
  admin: boolean;
  photo: string;
}

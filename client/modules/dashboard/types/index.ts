export type GetSummaryQueryParams = {
  from: string;
  to: string;
  accountId: number;
};

export type Summary = {
  earnings: number;
  spendings: number;
  remainings: number;
};

export type SummaryCategories = {
  id: number;
  name: string;
  amount: number;
}[];

export type SummaryTransactions = {
  date: Date;
  earnings: number;
  spending: number;
}[];

export type SummaryKeys = keyof Summary;

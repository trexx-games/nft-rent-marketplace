export const URLS = {
  RECOMMENDATIONS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/recommendations`,
  RENTS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/rents`,
  POOLS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/pools`,
  ITEMS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/items`,
  BLOCKCHAINS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/blockchains`,
};

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
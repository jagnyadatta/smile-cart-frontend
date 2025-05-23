import { QUERY_KEYS } from "constants/query";

import productsApi from "apis/products";
import { useQueries, useQuery } from "react-query";

export const useShowProduct = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
  });

export const useFetchProducts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productsApi.fetch(params),
    enabled: true,
    keepPreviousData: true,
  });

export const useFetchCartProducts = slugs => {
  const queries = (slugs || []).map(slug => ({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
  }));

  return useQueries(queries); // Always call useQueries even if empty
};

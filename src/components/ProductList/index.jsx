import { useState } from "react";

import routes from "apis/routes";
import { Header } from "components/commons";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { NoData, Spinner, Input, Pagination } from "neetoui";
import { isEmpty, mergeLeft, without } from "ramda";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const { page, pageSize } = queryParams;
  const [searchKey, setSearchKey] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;

  const productsParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };
  const history = useHistory();

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };

    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  });

  // const fetchProducts = async () => {
  //   try {
  //     const data = await productsApi.fetch({
  //       searchTerm: debouncedSearchKey,
  //     });
  //     // setProducts(data.products);
  //     // console.log(products);
  //   } catch (error) {
  //     console.log("An error occurred:", error);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(
        routes.products.index,
        mergeLeft({ page, pageSize: DEFAULT_PAGE_SIZE }, queryParams)
      )
    );

  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );

  // useEffect(() => {
  //   fetchProducts();
  // }, [debouncedSearchKey]);
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="m-2">
        <Header
          cartItemsCount={cartItems.length}
          shouldShowBackButton={false}
          title="Smile cart"
          actionBlock={
            <Input
              placeholder="Search products"
              prefix={<Search />}
              type="search"
              value={searchKey}
              onChange={({ target: { value } }) => {
                updateQueryParams(value);
                setSearchKey(value);
              }}
            />
          }
        />
      </div>
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
              isInCart={cartItems.includes(product.slug)}
              toggleIsInCart={() => toggleIsInCart(product.slug)}
            />
          ))}
        </div>
      )}
      <div className="mb-5 self-end">
        <Pagination
          count={totalProductsCount}
          navigate={handlePageNavigation}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  );
};

export default ProductList;

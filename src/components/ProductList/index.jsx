import { Spinner } from "neetoui";
import productsApi from "apis/products";
import { useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import { Header } from "components/commons";

const ProductList = () =>{ 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch();
      setProducts(products);
      // console.log(products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        <Header shouldShowBackButton={false} title="Smile Cart" />
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
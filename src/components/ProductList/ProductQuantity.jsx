// ...
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
// ...

const ProductQuantity = ({ slug }) => {
  // ...
  const { data: product = {} } = useShowProduct(slug);

  const { availableQuantity } = product;

  // ...
  return <div>{availableQuantity}</div>;
};
export default ProductQuantity;

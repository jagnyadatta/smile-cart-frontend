import routes from "apis/routes";
import { Header, PageNotFound } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import { IMAGE_URLS } from "components/constants";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Typography, Spinner, Button } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  // const [product, setProduct] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);
  // const fetchProducts = async () => {
  //   try {
  //     const response = await productsApi.show(slug);
  //     // setProduct(response);
  //   } catch (error) {
  //     // setIsError(true);
  //     console.log(error);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };

  const { name, description, mrp, offerPrice, imageUrl, availableQuantity } =
    product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) return <PageNotFound />;

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(IMAGE_URLS) ? (
              <Carousel />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;

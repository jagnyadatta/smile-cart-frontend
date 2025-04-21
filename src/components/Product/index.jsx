import { useEffect, useState } from "react";
import { Typography } from "neetoui";
import { Spinner } from "neetoui";
import productsApi from "apis/products";
import { Header, PageNotFound } from "components/commons";
import { useParams } from "react-router-dom";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
    const fetchProduct = async () => {
      try {
        const response = await productsApi.show(slug);
        setProduct(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const { name, description, mrp, offerPrice, imageUrl } = product;
    const totalDiscounts = mrp - offerPrice;
    const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);

    useEffect(() => {
      fetchProduct();
    }, []);

    if (isLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner />
        </div>
      );
    }

    if(isError) return <PageNotFound/>;

    return (
      <div className="px-6 pb-6">
        <Header title={name} />
        <div className="flex gap-4 mt-6">
          <div className="w-2/5">
            <div className="flex justify-center gap-16">
              <img alt={name} className="w-48" src={imageUrl} />
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
          </div>
        </div>
      </div>
    );
  };
  export default Product;
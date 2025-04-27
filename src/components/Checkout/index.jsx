import { useRef, useState } from "react";

import routes from "apis/routes";
import { PageLoader } from "components/commons";
import { CHECKOUT_FORM_VALIDATION_SCHEMA } from "components/constants";
import {
  useFetchCountries,
  useCreateOrder,
} from "hooks/reactQuery/useCheckoutApi";
import i18n from "i18next";
import { LeftArrow } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import { CHECKOUT_FORM_INITIAL_VALUES } from "./constants";
import Form from "./Form";

const Checkout = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const timerRef = useRef(null);
  const clearCart = useCartItemsStore.pickFrom();
  const { isLoading } = useFetchCountries();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const { mutate: createOrder } = useCreateOrder();

  const redirectToHome = () => {
    timerRef.current = setTimeout(() => {
      history.push(routes.root);
      clearCart();
    }, 1500);
  };

  const handleSubmit = values => {
    setIsSubmitDisabled(true);

    createOrder(
      { payload: values },
      {
        onSuccess: () => {
          redirectToHome();
        },
        onError: () => setIsSubmitDisabled(false),
      }
    );
  };

  const handleRedirect = () => {
    if (timerRef.current) {
      history.push(routes.root);
      clearCart();
      clearTimeout(timerRef.current);
    } else {
      history.goBack();
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <NeetoUIForm
      formProps={{ noValidate: true }}
      formikProps={{
        initialValues: CHECKOUT_FORM_INITIAL_VALUES,
        validationSchema: CHECKOUT_FORM_VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
      }}
    >
      <div className="flex space-x-4">
        <div className="m-10 w-1/2">
          <div className="flex items-center">
            <LeftArrow
              className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-4"
              onClick={handleRedirect}
            />
            <Typography
              className="text-left"
              component="u"
              style="h3"
              textTransform="uppercase"
              weight="bold"
            >
              {t("checkout")}
            </Typography>
          </div>
          <div className="mt-8 space-y-4">
            <Form />
          </div>
        </div>
        <div className="neeto-ui-bg-gray-300 h-screen w-1/2 pt-10">
          <div className="mt-auto flex justify-center">
            <Button
              className="bg-neutral-800 w-1/3 justify-center"
              disabled={isSubmitDisabled}
              label={t("confirmOrder")}
              type="submit"
            />
          </div>
        </div>
      </div>
    </NeetoUIForm>
  );
};

export default withTitle(Checkout, i18n.t("checkout"));

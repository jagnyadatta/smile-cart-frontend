import { t } from "i18next";
import * as yup from "yup";

export const IMAGE_URLS = [
  "https://ik.imagekit.io/d9mvewbju/SmileCart/thumbnail_61_7PaLfb.jpg",
  "https://ik.imagekit.io/d9mvewbju/SmileCart/1_yuRfcETI5.jpg",
  "https://ik.imagekit.io/d9mvewbju/SmileCart/2_HoKD2OblW.png",
  "https://ik.imagekit.io/d9mvewbju/SmileCart/3_-6sHqwicC.png",
];

export const VALID_COUNT_REGEX = /^(?:\d*|)$/;

export const MRP = "mrp";

export const OFFER_PRICE = "offerPrice";

export const CHECKOUT_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(t("validations.emailInvalid"))
    .required(t("validations.emailRequired")),
  country: yup
    .object()
    .shape({
      name: yup.string().required(),
      code: yup.string().required(),
    })
    .nullable(),
  firstName: yup.string().required(t("validations.firstNameRequired")),
  lastName: yup.string().required(t("validations.lastNameRequired")),
  address: yup.string().required(t("validations.addressRequired")),
  apartment: yup.string().required(t("validations.apartmentRequired")),
  city: yup.string().required(t("validations.cityRequired")),

  state: yup
    .object()
    .shape({
      name: yup.string().required(),
      code: yup.string().required(),
    })
    .nullable()
    .required(t("validations.stateRequired")),

  zipCode: yup.number().required(t("validations.zipCodeRequired")),
});
export const CHECKOUT_LOCAL_STORAGE_KEY = "checkoutUserDetails";

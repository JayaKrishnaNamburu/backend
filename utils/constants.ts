// Table names shouldbe plura ??
// PSQL is throwing error if not so !!
export const DATABASE_MODELS = {
  USERS: "users",
  CATEGORIES: "categories",
  PRODUCTS: "products",
  CART: "carts",
  CART_ITEMS: "items",
};

export const DATABASE_COLUMNS = {
  USERS: {
    ID: "id",
    NAME: "name",
    EMAIL: "email",
    CREATEED_AT: "created_at",
    UPDATED_AT: "updated_at",
    PASSWORD_DIGEST: "password_digest",
    PHONE: "phone",
  },
  CATEGORIES: {
    ID: "id",
    NAME: "name",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
  },
  PRODUCTS: {
    ID: "id",
    NAME: "name",
    CATEGORY_ID: "category_id",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
    DESCRIPTION: "description",
    SHORT_DESCRIPTION: "short_description",
    PRICE: "price",
    QUANTITY: "quantity",
    IMAGE: "image",
  },
  CART: {
    ID: "id",
    USER_ID: "user_id",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
  },
  CART_ITEMS: {
    ID: "id",
    CART_ID: "cart_id",
    PRODUCT_ID: "product_id",
    COUNT: "count",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
  },
};

import { useProducts } from "@/client/services/stripe/product";

import { Product } from "../cards/Product";

export const Pricing = () => {
  const { products } = useProducts();

  if (!products || products.length === 0) {
    return null;
  }

  return <Product products={products} />;
};

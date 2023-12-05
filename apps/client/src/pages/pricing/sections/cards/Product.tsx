/* eslint-disable lingui/no-unlocalized-strings */
import { CircleNotch, StripeLogo } from "@phosphor-icons/react";
import { PriceDto, ProductDto } from "@reactive-resume/dto";
import { Button } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useState } from "react";

import { createCheckoutSession } from "@/client/services/stripe/stripe";

import { getStripe } from "../../stripeClient";

type Props = {
  products: ProductDto[];
};

export const Product = ({ products }: Props) => {
  const [product, setProduct] = useState(() => products[0]);
  const loading = "";
  const handleCheckout = async (price: PriceDto) => {
    const { sessionId } = await createCheckoutSession({
      priceId: price.id,
      quantity: 1,
    });

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });
  };
  return (
    <section className="">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">Pricing Plans</h1>
          <p className="m-auto mt-5 max-w-2xl text-xl sm:text-center sm:text-2xl">
            Start building for free, then add a site plan to go live. Account plans unlock
            additional features.
          </p>
          <div className="relative mt-6 flex self-center rounded-lg border border-foreground p-0.5 sm:mt-8">
            {products.map((prd) => {
              const active = prd.id === product.id;
              return (
                <button
                  onClick={() => setProduct(prd)}
                  type="button"
                  className={cn(
                    "relative  w-1/2 whitespace-nowrap rounded-md py-2 text-sm font-medium focus:outline-none sm:w-auto sm:px-8",
                    active && "border-slate-50 bg-foreground text-background shadow-sm",
                    !active && "ml-0.5 border  border-transparent bg-background text-foreground",
                  )}
                >
                  {prd.name}
                </button>
              );
            })}
          </div>
        </div>
        <div
          className={cn(
            "mt-12 space-y-8 sm:gap-6 lg:grid  lg:space-y-0 xl:gap-10",
            (product.prices?.length || 0) < 3 ? "lg:grid-cols-2" : "lg:grid-cols-3",
          )}
        >
          {/* <!-- Pricing Card --> */}
          {product.prices?.map((price) => {
            const priceString =
              price.unitAmount &&
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: price.currency!,
                minimumFractionDigits: 0,
              }).format(price?.unitAmount / 100);
            return (
              <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 p-6 text-center shadow dark:border-gray-600 xl:p-8">
                <h3 className="mb-4 text-2xl font-semibold">{product.name}</h3>
                <p className="font-light sm:text-lg">{price.description}</p>
                <div className="my-8 flex items-baseline justify-center">
                  <span className="mr-2 text-5xl font-extrabold"> {priceString}</span>
                  <span>/{price.interval ?? "lifetime"}</span>
                </div>
                {/* <!-- List --> */}
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    {/* <!-- Icon --> */}
                    <svg
                      className="h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* <!-- Icon --> */}
                    <svg
                      className="h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* <!-- Icon --> */}
                    <svg
                      className="h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>
                      Team size: <span className="font-semibold">1 developer</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* <!-- Icon --> */}
                    <svg
                      className="h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>
                      Premium support: <span className="font-semibold">6 months</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* <!-- Icon --> */}
                    <svg
                      className="h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span>
                      Free updates: <span className="font-semibold">6 months</span>
                    </span>
                  </li>
                </ul>
                <Button
                  asChild
                  size="lg"
                  disabled={!!loading}
                  onClick={() => handleCheckout(price)}
                >
                  <button>
                    {loading ? <CircleNotch className="animate-spin" /> : <StripeLogo />}{" "}
                    {price.pricingType === "recurring" ? "Subscribe now" : "Buy now"}
                  </button>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

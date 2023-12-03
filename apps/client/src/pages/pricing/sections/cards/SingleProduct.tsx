/* eslint-disable lingui/no-unlocalized-strings */
import { CircleNotch, StripeLogo } from "@phosphor-icons/react";
import { PriceDto, ProductDto } from "@reactive-resume/dto";
import { Button } from "@reactive-resume/ui";

import { createCheckoutSession } from "@/client/services/stripe/stripe";

import { getStripe } from "../../stripeClient";

type Props = {
  product: ProductDto;
};

export const SingleProduct = ({ product }: Props) => {
  const loading = "";
  const handleCheckout = async (price: PriceDto) => {
    const { sessionId } = await createCheckoutSession({
      priceId: price.id,
      quantity: 1,
    });

    const stripe = await getStripe();
    debugger;
    stripe?.redirectToCheckout({ sessionId });
  };
  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            Here at Flowbite we focus on markets where technology, innovation, and capital can
            unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
          {/* <!-- Pricing Card --> */}
          {product.prices?.map((price) => {
            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currency!,
              minimumFractionDigits: 0,
            }).format(price?.unitAmount || 0);
            return (
              <div className="mx-auto flex max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
                <h3 className="mb-4 text-2xl font-semibold">{product.name}</h3>
                <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
                  {product.description}
                </p>
                <div className="my-8 flex items-baseline justify-center">
                  <span className="mr-2 text-5xl font-extrabold"> {priceString}</span>
                  <span className="text-gray-500 dark:text-gray-400">/{price.interval}</span>
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
                    {loading ? <CircleNotch className="animate-spin" /> : <StripeLogo />} Get
                    started
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

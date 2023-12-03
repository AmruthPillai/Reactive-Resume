/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable lingui/no-unlocalized-strings */
import { PriceDto, ProductDto } from "@reactive-resume/dto";
import { useState } from "react";

type Props = {
  products: ProductDto[];
};

type BillingInterval = "year" | "month";

export const MultiProduct = ({ products }: Props) => {
  const loading = "";
  const handleCheckout = async (price: PriceDto) => {};

  const intervals = ["year", "month"];
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");
  return (
    <div className="p-10 sm:flex sm:flex-col">
      <div className="relative flex self-center rounded-lg bg-slate-200 p-0.5">
        <button
          type="button"
          className="relative w-1/2 whitespace-nowrap rounded-md border-slate-50 bg-slate-50 py-2 text-sm font-medium text-slate-900 shadow-sm focus:outline-none sm:w-auto sm:px-8"
        >
          Monthly billing
        </button>
        <button
          type="button"
          className="relative ml-0.5 w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-sm font-medium text-slate-900 focus:outline-none sm:w-auto sm:px-8"
        >
          Yearly billing
        </button>
      </div>
      <div className="mt-12 space-y-3 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 md:mx-auto md:max-w-5xl xl:grid-cols-3">
        <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-bold leading-6 text-slate-900">Starter</h2>
            <p className="mt-2 text-base leading-tight text-slate-700">
              For new makers who want to fine-tune and test an idea.
            </p>
            <p className="mt-8">
              <span className="text-4xl font-bold tracking-tighter text-slate-900">$0</span>

              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <a
              href="/sign-up"
              className="mt-8 block w-full rounded-md bg-slate-900 py-2 text-center text-sm font-semibold text-white"
            >
              Join as a Starter
            </a>
          </div>
          <div className="px-6 pb-8 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              What's included
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">1 landing page included</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">1,000 visits/mo</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Access to all UI blocks</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">50 conversion actions included</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">5% payment commission</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">Real-time analytics</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-bold leading-6 text-slate-900">Superior</h2>
            <p className="mt-2 text-base leading-tight text-slate-700">
              For creators with multiple ideas who want to efficiently test and refine them.
            </p>
            <p className="mt-8">
              <span className="text-4xl font-bold tracking-tighter text-slate-900">$8</span>

              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <a
              href="/sign-up"
              className="mt-8 block w-full rounded-md bg-slate-900 py-2 text-center text-sm font-semibold text-white"
            >
              Join as a Superior
            </a>
          </div>
          <div className="px-6 pb-8 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              What's included
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">All Free features</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">5 landing pages included</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">50,000 visits/mo</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">1,000 conversion actions included</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">1% payment commission</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 shadow-sm">
          <div className="p-6">
            <h2 className="text-xl font-bold leading-6 text-slate-900">Shipper</h2>
            <p className="mt-2 text-base leading-tight text-slate-700">
              For productive shippers who want to work more efficiently.
            </p>
            <p className="mt-8">
              <span className="text-4xl font-bold tracking-tighter text-slate-900">$15</span>

              <span className="text-base font-medium text-slate-500">/mo</span>
            </p>
            <a
              href="/sign-up"
              className="mt-8 block w-full rounded-md bg-slate-900 py-2 text-center text-sm font-semibold text-white"
            >
              Join as a Shipper
            </a>
          </div>
          <div className="px-6 pb-8 pt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              What's included
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">All Standard features</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">20 landing pages included</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">200,000 visits/mo</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">5,000 conversion actions included</span>
              </li>
              <li className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span className="text-base text-slate-700">No payment commission</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentConfirmation = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [activeTab, setActiveTab] = useState("card");

  return (
    <div>
      <div
        className={`${
          theme === "dark" ? "bg-slate-900/[0.9]" : "bg-white"
        } relative flex w-full pt-24 flex-col shadow-sm`}
      >
        {/* Header */}
        <div className="relative m-2.5 flex flex-col items-center justify-center text-white h-24 rounded-md bg-slate-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-10 w-10 text-white mb-2"
          >
            <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
            <path
              fillRule="evenodd"
              d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
              clipRule="evenodd"
            />
          </svg>
          <h5 className="text-xl">Payment</h5>
        </div>

        {/* Tabs */}
        <div className="p-6">
          <ul
            className="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
            role="tablist"
          >
            <li className="flex-auto text-center">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "card"}
                className={`flex items-center justify-center w-full py-2 text-sm transition-all ease-in-out border-0 rounded-md cursor-pointer focus:outline-none
                  ${
                    activeTab === "card"
                      ? "text-white bg-slate-800"
                      : "text-slate-600 bg-inherit"
                  }`}
                onClick={() => setActiveTab("card")}
              >
                Pay with Card
              </button>
            </li>
            <li className="flex-auto text-center">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "paypal"}
                className={`flex items-center justify-center w-full py-2 text-sm transition-all ease-in-out border-0 rounded-md cursor-pointer focus:outline-none
                  ${
                    activeTab === "paypal"
                      ? "text-white bg-slate-800"
                      : "text-slate-600 bg-inherit"
                  }`}
                onClick={() => setActiveTab("paypal")}
              >
                Pay with PayPal
              </button>
            </li>
          </ul>

          {/* Tab Panels */}
          <div className="mt-6">
            {activeTab === "card" && (
              <section role="tabpanel">
                <form className="flex flex-col">
                  <label className="mt-4 mb-1 text-sm text-slate-600">
                    Card Details
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-500 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                  />

                  <div className="flex">
                    <div className="w-full md:w-8/12 mr-4">
                      <label className="block mb-1 text-sm text-slate-600 mt-4">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-500 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                      />
                    </div>
                    <div className="w-full md:w-4/12">
                      <label className="block mb-1 text-sm text-slate-600 mt-4">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-500 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                      />
                    </div>
                  </div>

                  <label className="mt-4 mb-1 text-sm text-slate-600">
                    Holder Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-500 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                  />

                  <Link to="/OrderConfirmation">
                    <button
                      type="button"
                      className="w-full mt-6 rounded-md bg-slate-800 py-2 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 active:bg-slate-700 disabled:opacity-50"
                    >
                      Pay Now
                    </button>
                  </Link>
                  <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 font-light">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4 -mt-0.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Payments are secure and encrypted
                  </p>
                </form>
              </section>
            )}

            {activeTab === "paypal" && (
              <section role="tabpanel">
                {/* Replace this with your actual PayPal integration */}
                <div className="flex flex-col items-center">
                  <p className="text-slate-600">Proceed with PayPal payment:</p>
                  <button
                    type="button"
                    className="mt-6 rounded-md bg-blue-600 py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 active:bg-blue-500 disabled:opacity-50"
                  >
                    Pay with PayPal
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;

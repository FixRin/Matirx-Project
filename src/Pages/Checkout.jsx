import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import supabase from "../Utils/Supabase";
import { slugify } from "../Store/SlugConfig";
import { toast, ToastContainer } from "react-toastify";

export default function CheckoutForm() {
  const cardRef = useRef("");
  const dateRef = useRef("");
  const cvvRef = useRef("");
  const nameRef = useRef("");
  const [validPayment, setValidPayment] = useState(false);
  const handlePayment = () => {
    const cardNumber = cardRef.current.value.trim();
    const expDate = dateRef.current.value.trim();
    const cvv = cvvRef.current.value.trim();
    const name = nameRef.current.value.trim();

    const cardRegex = /^\d{16}$/; // 16 digit card
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY
    const cvvRegex = /^\d{3}$/;

    if (
      !cardRegex.test(cardNumber) ||
      !dateRegex.test(expDate) ||
      !cvvRegex.test(cvv) ||
      name.length < 3
    ) {
      toast.error("Please enter valid card information!");
      return;
    }

    // If everything is valid
    setValidPayment(true);
    toast.success("✅ Thank you for adding your card!");
  };
  const handlePaypal = () => {
    setValidPayment(true);
    toast.success("✅ Thank you for adding your card!");
  };

  const [activeTab, setActiveTab] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const year = date.getFullYear();

  // Get month name

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[date.getMonth()];

  const theme = useSelector((state) => state.theme.mode);
  const [session, setSession] = useState([]);
  const use = async () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  };
  useEffect(() => {
    use();
  }, []);

  const [data, setData] = useState([]);
  const using = async () => {
    let { data: profiles, error } = await supabase.from("profiles").select("*");

    setData(
      profiles[profiles.findIndex((user) => user.email === session.user.email)]
    );
  };

  useEffect(() => {
    using();
  }, [session]);
  const [emailData, setEmailData] = useState();
  const [firstName, setFirstName] = useState();
  const [surname, setSurname] = useState();
  const [postalCode, setPostalCode] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [Phone, setPhone] = useState();
  const [adress, setAdress] = useState("");
  const [apartment, setApartment] = useState("");
  useEffect(() => {
    setEmailData(data.email);
    setFirstName(data.FirstName);
    setSurname(data.Surname);
    setPostalCode(data.PostalCode);
    setState(data.State);
    setCountry(data.Country);
    setCity(data.City);
    setPhone(data.Phone);
    console.log(data);
  }, [data]);
  const isValid =
    apartment.trim() !== "" && adress.trim() !== "" && !isEmpty && validPayment;
  const [error, setError] = useState("");

  const creatingOrder = async () => {
    if (!isValid) {
      e.preventDefault(); // stop the Link
      setError("Both name and address are required.");
    } else {
      await supabase.from("Orders").insert([
        {
          FullName: data.FirstName + " " + data.Surname,
          date: day + " " + monthName + " " + year,
          TotalPrice: (
            cartTotal +
            (deliveryMethod === "standard" ? 5 : 15) +
            ((cartTotal + (deliveryMethod === "standard" ? 5 : 15)) * 18) / 100
          ).toFixed(1),
          Status: "Pending",
          email: data.email,
          deliveryMethod: deliveryMethod,
          taxes: (
            ((cartTotal + (deliveryMethod === "standard" ? 5 : 15)) * 18) /
            100
          ).toFixed(2),
          adress: adress,
          phone:Phone,
          apartment: apartment,
          imgSrc: items.map((item) => {
            return item.image;
          }),
          price: items.map((item) => {
            return item.price;
          }),
          quantity: items.map((item) => {
            return item.quantity;
          }),
          title: items.map((item) => {
            return item.name;
          }),
          desc: items.map((item) => {
            return item.desc;
          }),
          color: items.map((item) => {
            return item.color;
          }),
        },
      ]);
    }
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-texture bg-gray-900 text-white" : "bg-texture"
      }`}
    >
      {!session ? (
        <div></div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Column - Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Contact information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email address
                    </label>
                    <input
                      disabled
                      type="email"
                      value={emailData}
                      id="email"
                      className=" w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-1"
                    >
                      Phone
                    </label>
                    <input
                      disabled
                      value={Phone}
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Shipping information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium mb-1"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        disabled
                        id="firstName"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium mb-1"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        value={surname}
                        disabled
                        id="lastName"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium mb-1"
                      >
                        City
                      </label>
                      <input
                        disabled
                        value={city}
                        type="text"
                        id="city"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium mb-1"
                      >
                        Country
                      </label>
                      <input
                        id="country"
                        disabled
                        value={country}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium mb-1"
                      >
                        State/Province
                      </label>
                      <input
                        disabled
                        type="text"
                        value={state}
                        id="state"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postal"
                        className="block text-sm font-medium mb-1"
                      >
                        Postal code
                      </label>
                      <input
                        disabled
                        type="text"
                        value={postalCode}
                        id="postal"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-1"
                    >
                      Address
                    </label>
                    <input
                      required
                      value={adress}
                      onChange={(e) => {
                        setAdress(e.target.value);
                      }}
                      type="text"
                      id="address"
                      className="text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium mb-1"
                    >
                      Apartment, suite, etc.
                    </label>
                    <input
                      required
                      value={apartment}
                      onChange={(e) => {
                        setApartment(e.target.value);
                      }}
                      type="text"
                      id="apartment"
                      className="text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Delivery method</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:border-indigo-500">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="delivery"
                        value="standard"
                        checked={deliveryMethod === "standard"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <span className="font-medium">Standard</span>
                        <p className="text-sm text-gray-500">
                          4-10 business days
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">$5.00</span>
                  </label>

                  <label className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:border-indigo-500">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="delivery"
                        value="express"
                        checked={deliveryMethod === "express"}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <span className="font-medium">Express</span>
                        <p className="text-sm text-gray-500">
                          2-5 business days
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">$15.00</span>
                  </label>
                </div>
              </div>

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
                          Add Card
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
                          Add PayPal
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
                              ref={cardRef}
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
                                  ref={dateRef}
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
                                  ref={cvvRef}
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
                              ref={nameRef}
                              type="text"
                              placeholder="e.g. John Doe"
                              className="w-full bg-transparent placeholder:text-slate-400 text-slate-500 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
                            />

                            <button
                              onClick={handlePayment}
                              type="button"
                              className="w-full mt-6 rounded-md bg-slate-800 py-2 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 active:bg-slate-700 disabled:opacity-50"
                            >
                              Add Now
                            </button>

                           
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
                            <p className="text-slate-600">
                              Proceed with PayPal payment:
                            </p>
                            <button
                              onClick={handlePaypal}
                              type="button"
                              className="mt-6 rounded-md bg-blue-600 py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 active:bg-blue-500 disabled:opacity-50"
                            >
                              Add PayPal
                            </button>
                          </div>
                         
                        </section>
                        
                      )}
                    </div>
                    <ToastContainer position="bottom-left" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div
                className={`${
                  theme === "dark"
                    ? "bg-texture rounded-lg border p-6 bg-gray-900 text-white"
                    : "rounded-lg border p-6 bg-texture"
                }`}
              >
                <h2 className="text-lg font-semibold mb-4">Order summary</h2>
                <div className="space-y-4">
                  <div>
                    {" "}
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {isEmpty ? (
                        <div className="text-center my-10">
                          Your order is Empty{" "}
                        </div>
                      ) : (
                        items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={item.imageAlt}
                                src={item.image}
                                className="size-full object-cover"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium ">
                                  <h3>
                                    <a href={item.href}>{item.name}</a>
                                  </h3>
                                  <p className="ml-4">{item.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.color}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {item.quantity}
                                </p>

                                <div className="flex">
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${cartTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${deliveryMethod === "standard" ? 5 : 15}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes(18%)</span>
                      <span>
                        $
                        {(
                          ((cartTotal +
                            (deliveryMethod === "standard" ? 5 : 15)) *
                            18) /
                          100
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                      <span>Total</span>
                      <span>
                        $
                        {(
                          cartTotal +
                          (deliveryMethod === "standard" ? 5 : 15) +
                          ((cartTotal +
                            (deliveryMethod === "standard" ? 5 : 15)) *
                            18) /
                            100
                        ).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  <Link
                    onClick={creatingOrder}
                    to={
                      isValid
                        ? `/orderConfirmation/${slugify(data.id)}`
                        : location.pathname
                    }
                    className={`
          block w-full mt-8 h-[50px]
          button-cutout-black group justify-center
          inline-flex items-center bg-gradient-to-b
          from-25% to-75% bg-[length:100%_400%]
          font-bold transition-[filter,background-position]
          duration-300 hover:bg-bottom gap-3 px-1 text-lg
          ~py-2.5/3 from-brand-purple to-brand-lime
          text-white hover:text-black
          ${!isValid ? "opacity-50 cursor-not-allowed" : ""}
        `}
                  >
                    Confirm Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

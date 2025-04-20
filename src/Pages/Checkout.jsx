import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import supabase from "../Utils/Supabase";
import { Card } from "@mui/material";
import { slugify } from "../Store/SlugConfig";
import PaymentConfirmation from "./PaymentConfirmation";

export default function CheckoutForm() {
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
  const [adress, setAdress] = useState('');
  const [apartment, setApartment] = useState('');
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
  const isValid = apartment.trim() !== "" && adress.trim() !== "";
  const [error, setError] = useState("")

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

              <div><PaymentConfirmation/></div>
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
                    to={isValid ? `/paymentConfirmation/${slugify(data.id)}` : location.pathname}
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

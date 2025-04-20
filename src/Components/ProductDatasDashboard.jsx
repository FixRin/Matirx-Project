import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../Redux/ProductsSlice";
import { Link } from "react-router-dom";
import { slugify } from "../Store/SlugConfig";

const ProductDatasDashboard = () => {
 
  const { productItems, status, error } = useSelector(
    (state) => state.ProductData
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProductData());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead
          className={`${theme === "dark" ? "bg-gray-900/[0.9]" : "bg-gray-50"}`}
        >
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating  
            </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock 
              </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit/Add/Delete
            </th>
          </tr>
        </thead>

        <tbody>
          {!productItems ? (
            <div></div>
          ) : (
            productItems.map((products) => (
              <tr
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border-b   `}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {console.log()}
                  <img className="h-36  object-contain" src={products.img} />
                </th>
                <td className="px-6 py-4 whitespace-nowrap">
                  {products.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{products.star}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${products.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{products.Stock}</td>
                <td className="px-6 py-4 whitespace-nowrap  ">
                  <Link   key={products.id}
                               to={`/productedit/${slugify(products.title)}`}>
                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
                    <svg
                      className="fill-current"
                      height="18"
                      width="18"
                      fill="none"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ touchAction: "none" }}
                    >
                      <path
                        clipRule="evenodd"
                        d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                        fillRule="evenodd"
                      />
                    </svg>
                    {"Edit"}
                  </button>
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDatasDashboard;

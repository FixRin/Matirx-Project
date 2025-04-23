import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../Utils/Supabase";
import { Link } from "react-router-dom";
import { slugify } from "../Store/SlugConfig";

const Orders = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [data, setData] = useState();
  const using = async () => {
    let { data: orders, error } = await supabase.from("Orders").select("*");

    setData(orders);
  };

  useEffect(() => {
    using();
  }, []);

  return (
    <div className="overflow-x-auto">
      {!data ? (
        <div></div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead
            className={`${
              theme === "dark" ? "bg-gray-900/[0.9]" : "bg-gray-50"
            }`}
          >
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
            </tr>
          </thead>
          <tbody
            className={`${
              theme === "dark" ? "bg-gray-800/[0.6] " : "bg-white"
            } divide-y divide-gray-200`}
          >{console.log(data.reverse())}
            {[...data].reverse().map((datas) => (
              <TableRow
                id={datas.OrderId}
                customer={datas.FullName}
                date={datas.date}
                amount={datas.TotalPrice}
                status={datas.Status}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

function TableRow({ id, customer, date, amount, status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customer}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <Link to={`/orderDetail/${slugify(id)}`}>
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
          {"See All Detail"}
        </button>
        </Link>
      </td>
    </tr>
  );
}

export default Orders;

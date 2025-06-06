import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../Utils/Supabase";

const Orders = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [data, setData] = useState();
  let [order, setOrder] = useState();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const using = async () => {
    let { data: orders, error } = await supabase.from("Orders").select("*");

    setData(orders);
    const foundOrder = [];
    if(data){
    for (let i = 0; i < data.length; i++) {
      if (data[i].email === session.user.email) {
        foundOrder.push(data[i]);
        setOrder(foundOrder);
      }
    }}
    
  };

  useEffect(() => {
    using();
   
  }, [data]);

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
            </tr>
          </thead>
          <tbody
            className={`${
              theme === "dark" ? "bg-gray-800/[0.6] " : "bg-white"
            } divide-y divide-gray-200`}
          >
            {console.log(order)}
            {!order
              ? ""
              : order.map((datas) => (
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
    </tr>
  );
}

export default Orders;

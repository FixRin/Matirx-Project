import React, { useEffect, useState } from "react";
import supabase from "../Utils/Supabase";

const Users = () => {
  const [data, setData] = useState(null);
  const using = async () => {
    let { data: profiles, error } = await supabase.from("profiles").select("*");
    setData(profiles);
  };
  console.log(data);
  useEffect(() => {
    using();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {!data?<div></div>:data.map((users) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {users.email}
              </th>
              <td className="px-6 py-4">{users.id}</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

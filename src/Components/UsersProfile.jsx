import React, { useEffect, useState } from "react";
import supabase from "../Utils/Supabase";
import { useSelector } from "react-redux";

const Users = () => {
  const [data, setData] = useState(null);
  const using = async () => {
    let { data: profiles, error } = await supabase.from("profiles").select("*");
    setData(profiles);
  };

  useEffect(() => {
    using();
  }, []);
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div className="relative overflow-x-auto">
      <table
        className={`w-full text-sm text-left rtl:text-right ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }  `}
      >
        <thead
          className={`text-xs  uppercase   ${
            theme === "dark"
              ? "text-gray-400 bg-gray-900/[0.9]"
              : "text-gray-700 bg-gray-50"
          }  `}
        >
          <tr>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              FullName
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Password
            </th>
          </tr>
        </thead>
        <tbody>
          {!data ? (
            <div></div>
          ) : (
            data.map((users) => (
              <tr
                key={users.id}
                className={`${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                } border-b   `}
              >
                <th
                  scope="row"
                  className={`px-6 py-4 font-medium  whitespace-nowrap ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {users.email}
                </th>
                <td className="px-6 py-4">{users.id}</td>
                <td className="px-6 py-4">
                  {users.FirstName + " " + users.Surname}
                </td>
                <td className="px-6 py-4">{users.Phone}</td>
                <td className="px-6 py-4">{users.password}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

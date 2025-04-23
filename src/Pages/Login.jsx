import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Utils/Supabase";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/FetchLangData";
import { FiEye, FiEyeOff } from "react-icons/fi";
const Login = () => {
  const theme = useSelector((state) => state.theme.mode);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const Lang = useSelector((state) => state.lang.mode);
  const { items, status, errors } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div>Error: {errors}</div>;
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div>
      {" "}
      {!items[9] ? (
        <div>..</div>
      ) : (
        <div
          className={`${
            theme === "dark"
              ? "bg-texture bg-gray-900 text-white"
              : "bg-texture text-black"
          }flex min-h-full flex-col justify-center px-6 py-12 lg:px-8`}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2
              className={`mt-10 text-center text-2xl/9 font-bold tracking-tight ${
                theme === "dark" ? "text-white" : "text-black"
              } `}
            >
              {items[9][Lang].Login[0]}
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleLogin}
            >
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm/6 font-medium  ${
                    theme === "dark" ? "text-white" : "text-black"
                  } `}
                >
                  {items[9][Lang].Login[1]}
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className={`block text-sm/6 font-medium  ${
                      theme === "dark" ? "text-white" : "text-black"
                    } `}
                  >
                    {items[9][Lang].Login[2]}
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/changepassword"
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      {items[9][Lang].Login[3]}
                    </Link>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <button
                    type="button"
                    className="absolute top-2  right-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div>
                {error && (
                  <p className="text-red-500 text-xs italic mb-4">
                    {items[9][Lang].Login[8]}
                  </p>
                )}
                {successMessage && (
                  <p className="text-green-500 text-xs italic mb-4">
                    {successMessage}
                  </p>
                )}
                <button
                  type="submit"
                  style={{ height: "50px", width: "100%" }}
                  className=" mt-5  button-cutout-secondary group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
                >
                  {loading ? items[9][Lang].Login[7] : items[9][Lang].Login[6]}
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              {items[9][Lang].Login[4]}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {items[9][Lang].Login[5]}
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

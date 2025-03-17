import React, { useEffect,  useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Utils/Supabase";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Redux/FetchLangData";
const Register = () => {
  const theme = useSelector((state) => state.theme.mode);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const Lang = useSelector((state) => state.lang.mode);
  const { items, status, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  useEffect(() => {
    validateForm()
  }, [email, password, confirmPassword])

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!email) {
      newErrors.email = items[7][Lang].Register[2]
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = items[7][Lang].Register[3]
    }

    // Password validation
    if (!password) {
      newErrors.password = items[7][Lang].Register[5]
    } else if (password.length < 8) {
      newErrors.password = items[7][Lang].Register[6]
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = items[7][Lang].Register[7]
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = items[7][Lang].Register[9]
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = items[7][Lang].Register[10]
    }

    setErrors(newErrors)
    setIsValid(Object.keys(newErrors).length === 0)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!isValid) return
    setLoading(true)

    try {
      const { user, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        throw error
      }
      // Optionally redirect the user to a different page after successful registration.
      // For example: navigate('/dashboard');
      alert("Registration successful! Check your email for confirmation.")
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
      {!items[7]?<div></div>:
    <div className= {`${
      theme === "dark" ? "bg-texture bg-black text-white" : "bg-texture text-black"
    }flex min-h-full flex-col justify-center px-6 py-12 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className={`mt-10 text-center text-2xl/9 font-bold tracking-tight ${theme==='dark'?'text-white':'text-black'} `}>
          {items[7][Lang].Register[0]}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-2"
          action="#"
          method="POST"
          onSubmit={handleRegister}
        >
          <div>
            <label
              htmlFor="email"
              className={`block text-sm/6 font-medium ${theme==='dark'?'text-white':'text-black'} `}
            >
              {items[7][Lang].Register[1]}
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
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
               {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className={`block text-sm/6 font-medium ${theme==='dark'?'text-white':'text-black'} `}
              >
                {items[7][Lang].Register[4]}
              </label>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between mt-2">
              <label
                htmlFor="password"
                className={`block text-sm/6 font-medium ${theme==='dark'?'text-white':'text-black'} `}
              >
              {items[7][Lang].Register[8]}
              </label>
            </div>
            <div className="mt-2">
              <input
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                name="password"
                id="re-password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
          <div>
            <button
              type="submit"
              disabled={!isValid || loading}
              style={{ height: "50px", width: "100%" }}
              className=" mt-5  button-cutout-secondary group justify-center   inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white hover:text-black"
            >
                {loading ? items[7][Lang].Register[14] : items[7][Lang].Register[13]}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
        {items[7][Lang].Register[11]}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {items[7][Lang].Register[12]}
          </Link>
        </p>
      </div>
    </div>
    }
    </div>
  );
};

export default Register;
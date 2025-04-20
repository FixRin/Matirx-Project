import { useState, useEffect, useCallback } from "react";
import { FiUpload, FiEye, FiEyeOff } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import supabase from "../Utils/Supabase";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      const { data: subscription } = supabase.auth.onAuthStateChange(
        (_event, session) => setSession(session)
      );

      return () => subscription?.unsubscribe();
    };
    fetchSession();
  }, []);

  const [data, setData] = useState(null);
  useEffect(() => {
    if (session) {
      const fetchProfile = async () => {
        const { data: profiles } = await supabase.from("profiles").select("*");
        const userProfile = profiles.find(
          (user) => user.email === session.user.email
        );
        setData(userProfile);
      };
      fetchProfile();
    }
  }, [session]);

  const [formData, setFormData] = useState({
    profilePicture: null,
    username: "",
    surname: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        profilePicture: data.ProfilePicture || null,
        username: data.FirstName || "",
        surname: data.Surname || "",
        phone: data.Phone || "",
        email: data.email || "",
        country: data.Country || "",
        city: data.City || "",
        postalCode: data.PostalCode || "",
      });
    }
  }, [data]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profilePicture: "File size must be less than 5MB",
        }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    maxFiles: 1,
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username || formData.username.length < 3 || formData.username.length > 20) {
      newErrors.username = "Username must be between 3 and 20 characters";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const updates = {
          FirstName: formData.username,
          Surname: formData.surname,
          Phone: formData.phone,
          email: formData.email,
          Country: formData.country,
          City: formData.city,
          PostalCode: formData.postalCode,
          ProfilePicture: formData.profilePicture,
        };
        const { error } = await supabase.from("profiles").update(updates).eq("email", session.user.email);
        if (error) throw error;
        alert("Settings updated successfully!");
        setIsDirty(false);
      } catch (error) {
        alert("Failed to update settings: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    if (isDirty && window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
      setFormData({
        profilePicture: data.ProfilePicture || null,
        username: data.FirstName || "",
        surname: data.Surname || "",
        phone: data.Phone || "",
        email: data.email || "",
        country: data.Country || "",
        city: data.City || "",
        postalCode: data.PostalCode || "",
      });
      setErrors({});
      setIsDirty(false);
    }
  };

  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`${theme === "dark" ? "text-white" : "text-black"} min-h-screen px-4 sm:px-6 lg:px-8`}>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <div className={`${theme === "dark" ? "bg-gray-900/[0.8]" : "bg-white"} max-w-full mx-auto rounded-lg shadow-md p-8`}>
          <h2 className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-3xl font-bold mb-8`}>Account Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture Upload */}
            <div className="space-y-4">
              <label className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} block text-lg font-medium`}>Profile Picture</label>
              <div
                {...getRootProps()}
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-full w-40 h-40 mx-auto cursor-pointer ${
                  isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                {formData.profilePicture ? (
                  <img src={formData.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="space-y-1 text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600"><span>Upload photo</span></div>
                  </div>
                )}
              </div>
              {errors.profilePicture && <p className="text-red-500 text-sm mt-2">{errors.profilePicture}</p>}
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-xl font-semibold`}>Personal Information</h3>
              <div>
                <label htmlFor="username" className="block text-sm font-medium">Firstname</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-black ${
                    errors.username ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-blue-500`}                />
                {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="surname" className="block text-sm font-medium">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-black ${
                    errors.surname ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-blue-500`}                />
                {errors.surname && <p className="text-red-500 text-sm mt-2">{errors.surname}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-black ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-blue-500`}                />
                {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="email" className={`${theme === "dark" ? "text-white" : "text-gray-700"} block text-sm font-medium`}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-black ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-blue-500`}                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-6">
              <h3 className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-xl font-semibold`}>Address</h3>
              <div>
                <label htmlFor="country" className="block text-sm font-medium">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-black ${
                    errors.country ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-blue-500`}                />
                {errors.country && <p className="text-red-500 text-sm mt-2">{errors.country}</p>}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium">City/State</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-black ${
                    errors.city ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-blue-500`}                />
                {errors.city && <p className="text-red-500 text-sm mt-2">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm text-black ${
                    errors.postalCode ? "border-red-300" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-blue-500`}                />
                {errors.postalCode && <p className="text-red-500 text-sm mt-2">{errors.postalCode}</p>}
              </div>
            </div>

            {/* Password Management */}
            <div className="space-y-6">
              <h3 className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-xl font-semibold`}>Password Management</h3>
              <div>
                <div className="flex">
                <label htmlFor="currentPassword" className={`${theme === "dark" ? "text-white" : "text-gray-700"} block text-sm font-medium`}>Current Password </label>
                <button className="px-4 mx-6 bg-sky-400 text-gray-100 border border-gray-300 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Link to={"/changepassword"}>Change Password</Link>
                </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={data?.password || ""}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-50 disabled:bg-white focus:ring-blue-500 text-black"                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !isDirty}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                  loading || !isDirty ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
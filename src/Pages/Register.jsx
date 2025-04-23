// MultiStepRegister.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiEye, FiEyeOff, FiUser, FiMail, FiMapPin } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../Utils/Supabase';
import { fetchData } from '../Redux/FetchLangData';


const steps = [
  { key: 1, title: 'Account', icon: <FiMail size={20} /> },
  { key: 2, title: 'Profile', icon: <FiUser size={20} /> },
  { key: 3, title: 'Address', icon: <FiMapPin size={20} /> },
  { key: 4, title: 'Success', icon: null },
];

export default function MultiStepRegister() {
  const theme = useSelector((state) => state.theme.mode);
  const Lang = useSelector((state) => state.lang.mode);
  const { items, status, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    email: ' ',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    profilePhoto: null,
    postalCode: '',
    city: '',
    country: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [photoPreview, setPhotoPreview] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (form.profilePhoto) {
      const url = URL.createObjectURL(form.profilePhoto);
      setPhotoPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPhotoPreview('');
  }, [form.profilePhoto]);

  useEffect(() => {
    validateForm();
  }, [form, currentStep]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files && files.length ? files[0] : value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!form.email) {
        newErrors.email = items[8]?.[Lang]?.Register[2] || 'Email required';
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = items[8]?.[Lang]?.Register[3] || 'Invalid email';
      }

      if (!form.password) {
        newErrors.password = items[8]?.[Lang]?.Register[5] || 'Password required';
      } else if (form.password.length < 8) {
        newErrors.password = items[8]?.[Lang]?.Register[6] || 'Too short';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(form.password)) {
        newErrors.password = items[8]?.[Lang]?.Register[7] || 'Password must include a symbol';
      }

      if (!form.confirmPassword) {
        newErrors.confirmPassword = items[8]?.[Lang]?.Register[9] || 'Confirm password';
      } else if (form.confirmPassword !== form.password) {
        newErrors.confirmPassword = items[8]?.[Lang]?.Register[10] || 'Does not match';
      }
    }

    if (currentStep === 2) {
      if (!form.firstName) newErrors.firstName = 'First name is required.';
      if (!form.lastName) newErrors.lastName = 'Last name is required.';
     
    }

    if (currentStep === 3) {
      if (!form.postalCode) newErrors.postalCode = 'Postal code is required.';
      if (!form.city) newErrors.city = 'City is required.';
      if (!form.country) newErrors.country = 'Country is required.';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const next = () => {
    validateForm();
    if (!isValid) return;
    setCurrentStep(s => s + 1);
  };

  const back = () => {
    setErrors({});
    setCurrentStep(s => s - 1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
   const Valid = validateForm();
    if (!Valid) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({ email: form.email, password: form.password });
      if (error) throw error;

      if (data?.user) {
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            email: data.user.email,
            password: form.password,
            FirstName: form.firstName,
            Surname: form.lastName,
            Phone: form.phone,
            PostalCode: form.postalCode,
            City: form.city,
            Country: form.country
          }
        ]);
      }
      console.log(data)
      alert("Registration successful! Check your email for confirmation.");
      setCurrentStep(4);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const anim = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -40 }, transition: { duration: 0.35 } };

  return (
    <div className={`${theme=='dark'?'bg-gray-900':""} bg-texture flex items-center justify-center min-h-screen p-4`}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className={`bg-gradient-to-r ${theme=='dark'?'from-gray-800 to-gray-900':"from-pink-500 to-purple-600"} p-6 text-white`}>
          <h2 className="text-3xl font-extrabold tracking-wide text-center">Create Account</h2>
          <p className="mt-1 text-sm uppercase opacity-80 text-center">Step {currentStep} of {steps.length}</p>
          <div className="mt-4 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${(currentStep / steps.length) * 100}%` }} />
          </div>
        </div>

        <form onSubmit={handleRegister} method="POST" className="p-6 space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" {...anim} className="space-y-4">
                <div>
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className={`w-full h-[35px] px-4 py-3 text-lg rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
    ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
 />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                  <label>Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} className={`w-full h-[35px] px-4 py-3 text-lg rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
    ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 pr-10'}`}
 />
                    <button type="button" className="absolute top-2  right-2" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div>
                  <label>Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className={`w-full h-[35px] px-4 py-3 text-lg rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
    ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 pr-10'}`}
/>
                    <button type="button" className="absolute top-2 right-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step2" {...anim} className="space-y-4">
                <div>
                  <label>First Name</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className={`w-full h-[35px] px-4 py-3 text-lg rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
    ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
/>
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div>
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className={`w-full h-[35px] px-4 py-3 text-lg rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
    ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
/>
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
                <div>
                  <label>Phone</label>
                  <input type="text" name="phone" value={form.phone} onChange={handleChange} className={`w-full h-[35px] px-4 py-3 text-lg rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
    ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
/>
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step3" {...anim} className="space-y-4">
                <div>
                  <label>Postal Code</label>
                  <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} className={`w-full h-[35px] px-4 py-3 text-lg rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
    ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
/>
                  {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
                </div>
                <div>
                  <label>City</label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} className={`w-full h-[35px] px-4 py-3 text-lg rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
    ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
/>
                  {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                <div>
                  <label>Country</label>
                  <input type="text" name="country" value={form.country} onChange={handleChange} className={`w-full h-[35px] px-4 py-3 text-lg rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 
    ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}
/>
                  {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div key="step4" {...anim} className="text-center space-y-4 py-10">
                <div className="text-green-500 text-6xl">🎉</div>
                <h3 className="text-2xl font-bold text-gray-800">Registration Complete!</h3>
                <p className="text-gray-600">Welcome aboard. You can now log in to your account.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {currentStep < 4 && (
            <div className="flex justify-between items-center mt-8">
              {currentStep > 1 && (
                <button type="button" onClick={back} disabled={loading} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                  Back
                </button>
              )}
              <button
                type={currentStep === steps.length - 1 ? 'submit' : 'button'}
                onClick={currentStep < steps.length - 1 ? next : undefined}
                disabled={form.country&&loading}
                className={`${theme=='dark'?"bg-pink-700 hover:bg-pink-800":"bg-pink-500 hover:bg-pink-600"} px-6 py-3  text-white rounded-lg  flex items-center transition shadow-md`}
              >
                {loading && <span className="animate-spin mr-2 border-2 border-white rounded-full w-4 h-4 border-t-transparent"></span>}
                {currentStep === steps.length - 1 ? 'Register' : 'Next'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

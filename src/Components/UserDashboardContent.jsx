import { useDispatch, useSelector } from "react-redux";
import supabase from "../Utils/Supabase";
import { useEffect, useState } from "react";
import SidebarItem from '../Pages/UserDashboard'
import { setActiveTab } from "../Redux/ActiveTabSlice";
export default function DashboardContent() {
    const [session, setSession] = useState(null);
  
    const use = async()=>{
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
  
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
  
      return () => subscription.unsubscribe();
    }
    useEffect(() => {
   use()
    }, []);
  
    const theme = useSelector((state) => state.theme.mode);
    const [data, setData] = useState(null);
    const using = async () => {
      let { data: profiles, error } = await supabase.from("profiles").select("*");

      setData(profiles[profiles.findIndex((user)=>user.email===session.user.email)]);
    };
  
    useEffect(() => {
      using();
    }, [session]);
    

    const activeTab = useSelector((state) => state.activeTab);
    const dispatch = useDispatch()
    return (
      <div className={`rounded-2xl border border-gray-200 ${theme==='dark'?'bg-gray-800/[0.6] ':'bg-white' } p-5  dark:bg-white/[0.03] lg:p-6`}>
        {!data?<div></div>:
          <div>
      <h3 className={`mb-5 text-lg font-semibold ${theme==='dark'?'text-white/90':'text-gray-800'}  lg:mb-7`}>
        {"Profile"}
      </h3>
      <div className="p-5 mb-6 border border-gray-200 rounded-2xl  lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-30 overflow-hidden border border-gray-200 rounded-full ">
              <img
                alt="user"
                src={data.ProfilePicture}
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className={`mb-2 text-lg font-semibold text-center xl:text-left ${theme==='dark'?'text-white/90':'text-gary-800'} `}>
                {data.FirstName+" "+data.Surname}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className={`text-sm ${theme==='dark'?'text-gray-400':"text-gray-500"}  `}>
                  User
                </p>
             
              </div>
            </div>
   </div>
   
          <button
           onClick={() => dispatch(setActiveTab('settings'))}
           className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
          
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
        </div>
      </div>
      <div className="p-5 mb-6 border border-gray-200 rounded-2xl  lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className={`text-lg font-semibold text-gray-800 ${theme==='dark'?'text-white/90':'text-gary-800'} lg:mb-6`}>
              {"Personal Information"}
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className={`mb-2 text-xs leading-normal ${theme==='dark'?'text-gray-400':"text-gray-500"} `}>
                  {"First Name"}
                </p>
                <p className={`text-sm font-medium text-gray-800 ${theme==='dark'?'text-white/90':'text-gary-800'}`}>
                {data.FirstName}
                </p>
              </div>
              <div>
                <p className={`mb-2 text-xs leading-normal ${theme==='dark'?'text-gray-400':"text-gray-500"} `}>
                  {"Last Name"}
                </p>
                <p className={`text-sm font-medium text-gray-800 ${theme==='dark'?'text-white/90':'text-gary-800'}`}>
                {data.Surname}
                </p>
              </div>
              <div>
                <p className={`mb-2 text-xs leading-normal ${theme==='dark'?'text-gray-400':"text-gray-500"} `}>
                  {"Email address"}
                </p>
                <p className={`text-sm font-medium text-gray-800 ${theme==='dark'?'text-white/90':'text-gary-800'}`}>
                  {data.email}
                </p>
              </div>
              <div>
                <p className={`mb-2 text-xs leading-normal ${theme==='dark'?'text-gray-400':"text-gray-500"} `}>
                  {"Phone"}
                </p>
                <p className={`text-sm font-medium text-gray-800 ${theme==='dark'?'text-white/90':'text-gary-800'}`}>
                  {data.Phone}
                </p>
              </div>
              <div>
             
             
              </div>
            </div>
          </div>
          <button
           onClick={() => dispatch(setActiveTab('settings'))}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
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
        </div>
      </div>
      <div className="p-5 border border-gray-200 rounded-2xl  lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className={`text-lg font-semibold text-gray-800 ${theme==='dark'?'text-white/90':'text-gary-800'} lg:mb-6`}>
              {"Address"}
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className={`mb-2 text-xs leading-normal ${theme==='dark'?'text-gray-400':"text-gray-500"} `}>
                  {"Country"}
                </p>
                <p className={`text-sm font-medium text-gray-800 ${theme==='dark'?'text-white/90':'text-gary-800'}`}>
                {data.Country}
                </p>
              </div>
              <div>
                <p className={`mb-2 text-xs leading-normal ${theme==='dark'?'text-gray-400':"text-gray-500"} `}>
                  {"City/State"}
                </p>
                <p className={`text-sm font-medium text-gray-800 ${theme==='dark'?'text-white/90':'text-gary-800'}`}>
                {data.City}
                </p>
              </div>
              <div>
                <p className={`mb-2 text-xs leading-normal ${theme==='dark'?'text-gray-400':"text-gray-500"} `}>
                  {"Postal Code"}
                </p>
                <p className={`text-sm font-medium text-gray-800 ${theme==='dark'?'text-white/90':'text-gary-800'}`}>
                 {data.PostalCode}
                </p>
              </div>
         
            </div>
          </div>
          <button 
        onClick={() => dispatch(setActiveTab('settings'))}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
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
        </div>
      </div>
</div>}
    </div>
    );
  }
  
  function StatCard({ title, value, change, isPositive }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        <p
          className={`text-sm mt-2 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {change}
        </p>
      </div>
    );
  }
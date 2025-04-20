import { useSelector } from "react-redux";
import { useCart } from "react-use-cart";
import supabase from "../Utils/Supabase";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";

function OrderConfirmation() {
  const theme = useSelector((state) => state.theme.mode);
  const [session, setSession] = useState([]);
  const use = async () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  };
  useEffect(() => {
    use();
  }, []);

  const [profileData, setProfileData] = useState([]);
  const usingProfile = async () => {
    let { data: profiles, error } = await supabase.from("profiles").select("*");

    setProfileData(
      profiles[profiles.findIndex((user) => user.email === session.user.email)]
    );
  };

  useEffect(() => {
    usingProfile();
  }, [session]);
  
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();
  const [data, setData] = useState()
  const using = async () => {
      let { data: orders, error } = await supabase.from("Orders").select("*");

      setData(orders);
    };
  
    useEffect(() => {
      using();
    
    }, []);
    
 
  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-texture w-100 bg-gray-900 text-white"
          : "w-100 bg-texture"
      }`}
    >
      {!data?<div><Loader/></div>:
      <div className="max-w-2xl mx-auto p-6 py-24 font-sans">
        <div className="mb-6">
          <p className="text-purple-600 font-medium text-sm">Thank you!</p>
          <h1 className="text-3xl font-bold  mb-1">It's on the way!</h1>
          <p className="text-gray-600 text-sm">
            Your order  has shipped and will be with you soon.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-1">Tracking number</p>
          <p className="text-purple-600 text-sm">{data[data.length-1].OrderId}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4  mb-6">
          {items.map((item) => (
            <div className="flex gap-4 py-2">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src={item.image}
                  alt="Cold Brew Bottle"
                  className="object-contain"
                  style={{ width: "70px", height: "80px" }}
                />
               
              </div>
              <div className="flex-1">
                <h3 className="font-medium ">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                <div className="flex justify-between">
                  <p className="text-sm">{item.quantity}</p>
                  <p className="text-sm">{item.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-amber-600 mb-2">
              Shipping address
            </h3>
            <div className="text-sm text-gray-600">
              <p>Maria Rodriguez</p>
              <p>7363 Cynthia Pass</p>
              <p>Toronto, ON M3Y 4H8</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-amber-600 mb-2">
              Billing address
            </h3>
            <div className="text-sm text-gray-600">
              <p>{data[data.length-1].FullName}</p>
              <p>{profileData.PostalCode} {profileData.State}</p>
              <p>{profileData.City}, {data[data.length-1].adress}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-amber-600 mb-2">
              Payment method
            </h3>
            <div className="text-sm text-gray-600">
              <p>Apple Pay</p>
              <p>Mastercard</p>
              <p>••••3456</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-amber-600 mb-2">
              Shipping method
            </h3>
            <div className="text-sm text-gray-600">
              <p>{data[data.length-1].deliveryMethod}</p>
              <p>{data[data.length-1].deliveryMethod==='standard'?'Takes up to 4-10 buisness days':'Takes up to 2-5 buisness days'}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-2 ">
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Subtotal</p>
            <p className="text-sm font-medium">${cartTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Shipping</p>
            <p className="text-sm font-medium">${data[data.length-1].deliveryMethod==='standard'?5:15}</p>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex gap-2">
              <p className="text-sm text-gray-600">Taxes</p>
         
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                18%
              </span>
          
              
            </div>
            
            <p className="text-sm font-medium text-red-600">${data[data.length-1].taxes}</p>
          </div>
        
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <p className="text-sm font-medium">Total</p>
            <p className="text-sm font-bold">${data[data.length-1].TotalPrice}</p>
          </div>
        </div>
      </div>
}
    </div>
  );
}

export default OrderConfirmation;

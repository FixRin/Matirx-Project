import React from "react";
import { useCart } from "react-use-cart";
import { Minus, Plus, Trash2 } from "lucide-react"
const Basket = () => {
  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
  } = useCart();

  return (
    <div>
      {" "}
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        
        {isEmpty?<div className="text-center">Your cart is Empty </div>:items.map((item) => (
          <li key={item.id} className="flex py-6">
            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                alt={item.imageAlt}
                src={item.image}
                className="size-full object-cover"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href={item.href}>{item.name}</a>
                  </h3>
                  <p className="ml-4">{item.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.color}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

                <div className="flex">
                  <button
                    onClick={() => removeItem(item.id)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default Basket;

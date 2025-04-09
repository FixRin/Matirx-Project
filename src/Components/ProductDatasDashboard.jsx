import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../Redux/ProductsSlice';

const ProductDatasDashboard = () => {
    const { productItems, status, error } = useSelector(
        (state) => state.ProductData
      );
      
      const dispatch = useDispatch();
      useEffect(() => {
        if (status === "idle") {
          dispatch(fetchProductData());
        }
      }, [status, dispatch]);
    
      if (status === "failed") {
        return <div>Error: {error}</div>;
      }
  return (
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Image
          </th>
          <th scope="col" className="px-6 py-3">
            Title
          </th>
          <th scope="col" className="px-6 py-3">
            Rating
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {!productItems[0]?<div></div>:productItems[0].Products.map((products) => (
            
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >{console.log(productItems)}
            <img className='h-24' src={products.img}/>
              
            </th>
            <td className="px-6 py-4">{products.title}</td>
            <td className="px-6 py-4">{products.star}</td>
            <td className="px-6 py-4">${products.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default ProductDatasDashboard
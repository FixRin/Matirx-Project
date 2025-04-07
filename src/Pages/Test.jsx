import { useState } from 'react';
import supabase from '../Utils/Supabase';
import { product } from '../Store';

const UpdateProduct = () => {
  // Assume 'product' is an object passed as a prop with existing details

  const [productName, setProductName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Update the record in the 'products' table where id matches
    const { data, error } = await supabase
      .from('Products')
      .update({ name: productName, price: parseFloat(price) })
      .eq('id', product.id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Product updated successfully!');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Product</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default UpdateProduct;

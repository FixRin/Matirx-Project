import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../Redux/ProductsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { slugify } from "../Store/SlugConfig";
import supabase from "../Utils/Supabase";
import { product } from "../Store";

export default function ProductEdit() {
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
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find the product that matches the slug
  const producta = productItems.find(
    (product) => slugify(product.title) === slug
  );

  // If no product is found, redirect to home page
  useEffect(() => {
    if (!producta) {
      navigate("/");
    }
  }, [producta, navigate]);

  // If product is still loading or not found, show loading state
  if (!producta) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }
  const Edit = async () => {
    const { data, error } = await supabase
      .from("Product")
      .update({
        title: title,
        desc: desc,
        price: parseInt(price),
        Stock: parseInt(stock), // lowercase 'stock'
        img: producta.img,
      })
      .eq("id", producta.id)
      .select(); // this is important to return updated data

    if (error) {
      console.error("Update failed:", error.message);
      alert("Update failed: " + error.message);
    } else {
      console.log("Product updated:", data);
      alert("Product updated!");
      navigate("/");
    }
  };
  const Add = async () =>{
    const { data, error } = await supabase
    .from("Product")
    .insert([
      {
        
        title: addTitle,
        desc: addDesc,
        price: parseInt(addPrice),
        Stock: parseInt(addStock),
        star:4.5,
        
        img: addImgSrc || "https://via.placeholder.com/150", // fallback image
      },
    ])
   

  if (error) {
    console.error("Add failed:", error.message);
    alert("Failed to add product.");
  } else {
    alert("Product added!");
    navigate("/"); // redirect
  }
  };

  const Delete = async () => {
    const { error } = await supabase
      .from("Product")
      .delete()
      .eq("id", producta.id);
    if (error) {
      console.error("Delete failed:", error.message);
    } else {
      console.log("Deleted!");
    }
    navigate("/");
  };
  const theme = useSelector((state) => state.theme.mode);
  const [title, setTitle] = useState(producta.title);
  const [desc, setDesc] = useState(producta.desc);
  const [price, setPrice] = useState(producta.price);
  const [stock, setStock] = useState(producta.Stock);
  const [imgSrc, setImgSrc] = useState(producta.img);
  const [addTitle, setAddTitle] = useState('');
  const [addDesc, setAddDesc] = useState('');
  const [addPrice, setAddPrice] = useState('');
  const [addStock, setAddStock] = useState('');
  const [addImgSrc, setAddImgSrc] = useState('');
  console.log(title);
  return (
    <div
      className={`${
        theme === "dark" ? "bg-texture bg-gray-900 " : "bg-texture"
      }`}
    >
      <h1
        className={`${
          theme === "dark" ? "text-white" : "text-black"
        } text-3xl font-bold mb-6 pt-24 `}
      >
        Edit Product/Add Product
      </h1>
      <div className="min-w-3xl mx-auto p-6 lg:flex lg:justify-evenly    block w">
        <div
          className={`${
            theme === "dark" ? "bg-gray-800/[0.6] " : "bg-white"
          } shadow-md rounded-2xl p-6 space-y-6 lg:mb-0 mb-12  `}
        >
          <div>
            <label
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } block font-medium mb-1`}
            >
              Produtitle{" "}
            </label>
            <input
              name="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } block font-medium mb-1`}
            >
              Description
            </label>
            <textarea
              name="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } block font-medium mb-1`}
              >
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } block font-medium mb-1`}
              >
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } block font-medium mb-1`}
            >
              Category
            </label>
            <select
              name="category"
              value={producta.category}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </div>

          <div>
            <label
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } block font-medium mb-1`}
            >
              Produt Image Source{" "}
            </label>
            <input
              name="name"
              value={imgSrc}
              onChange={(e) => setImgSrc(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />

            {producta.img && (
              <img
                src={imgSrc}
                alt="Preview"
                className="mt-4 rounded-lg w-40 h-40 object-cover border"
              />
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={Delete}
              className="px-4 py-2 rounded-lg bg-red-600  border border-gray-300  hover:bg-red-500"
            >
              Delete
            </button>
            <button
              onClick={Edit}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Product
            </button>
          </div>
        </div>{" "}
        <div
          className={`${
            theme === "dark" ? "bg-gray-800/[0.6] " : "bg-white"
          } shadow-md rounded-2xl p-6 space-y-6 lg:mb-0 mb-12  `}
        >
          <div>
            <label
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } block font-medium mb-1`}
            >
              Product Name
            </label>
            <input
              name="name"
              value={addTitle}
              onChange={(e) => setAddTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } block font-medium mb-1`}
            >
              Description
            </label>
            <textarea
              value={addDesc}
              onChange={(e) => setAddDesc(e.target.value)}
              name="description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } block font-medium mb-1`}
              >
                Price ($)
              </label>
              <input
                value={addPrice}
                onChange={(e) => setAddPrice(e.target.value)}
                type="number"
                name="price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } block font-medium mb-1`}
              >
                Stock
              </label>
              <input
                value={addStock}
                onChange={(e) => setAddStock(e.target.value)}
                type="number"
                name="stock"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } block font-medium mb-1`}
            >
              Category
            </label>
            <select
              name="category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </div>

          <div>
            <label
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } block font-medium mb-1`}
            >
              Produt Image Source{" "}
            </label>
            <input
              name="name"
              value={addImgSrc}
              onChange={(e) => setAddImgSrc(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />

            {producta.img && (
              <img
                src={addImgSrc}
                alt="Preview"
                className="mt-4 rounded-lg w-40 h-40 object-cover border"
              />
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
            onClick={Add}
             className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

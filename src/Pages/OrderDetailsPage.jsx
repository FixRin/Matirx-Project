import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import supabase from "../Utils/Supabase";
import { FiDownload, FiMessageCircle, FiPrinter } from "react-icons/fi";
import jsPDF from "jspdf";

const OrderDetailsPage = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const theme = useSelector((state) => state.theme.mode);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch orders from Supabase

      const { data, error } = await supabase.from("Orders").select("*");

      // Check for error
      if (error) {
        console.error("Error fetching orders:", error);
        return;
      }

      // Find the order based on the slug (OrderId)
      const foundOrder = data.find((p) => p.OrderId === slug); // Assuming the `slug` is the OrderId in this case

      if (foundOrder) {
        // Parse stringified arrays into actual arrays
        const titles = JSON.parse(foundOrder.title); // Parse title array
        const prices = JSON.parse(foundOrder.price); // Parse price array
        const quantities = JSON.parse(foundOrder.quantity); // Parse quantity array
        const images = JSON.parse(foundOrder.imgSrc); // Parse imgSrc array
        const descriptions = JSON.parse(foundOrder.desc); // Parse desc array

        // Now you can map over the arrays
        const products = titles.map((title, index) => ({
          id: index + 1, // Create a unique ID for each product
          name: title,
          image: images[index] || "", // Image from imgSrc array
          description: descriptions[index] || "", // Description from desc array
          quantity: parseInt(quantities[index], 10), // Quantity from quantity array
          price: parseFloat(prices[index]), // Price from price array
          subtotal: parseFloat(prices[index]) * parseInt(quantities[index], 10),
        }));

        // Set order data state
        setOrderData({
          orderNumber: foundOrder.OrderId,
          orderDate: foundOrder.date,
          status: foundOrder.Status,
          customer: {
            name: foundOrder.FullName,
            email: foundOrder.email,
            phone: foundOrder.phone,
            shippingAddress: `${foundOrder.apartment} ${foundOrder.adress}`, // Shipping address combined
            billingAddress: foundOrder.adress, // Billing address is the same for now
          },
          products: products,
          pricing: {
            subtotal: (
              foundOrder.TotalPrice -
              foundOrder.taxes -
              (foundOrder.deliveryMethod === "standard" ? 5 : 15)
            ).toFixed(1),
            shipping: foundOrder.deliveryMethod === "standard" ? 5 : 15, // Example shipping cost
            tax: foundOrder.taxes, // Tax value from the order

            total: foundOrder.TotalPrice,
          },
          timeline: [
            { status: "Order Placed", date: "2024-01-15", completed: true },
            { status: "Processing", date: "2024-01-16", completed: true },
            { status: "In Transit", date: "2024-01-17", completed: true },
            { status: "Delivered", date: "2024-01-19", completed: false },
          ],
        });
      } else {
        console.error("Order not found!");
      }
    };

    fetchData();
  }, [slug]); // Dependency on slug, so it re-fetches when the slug changes

  if (!orderData) return <div>Loading...</div>; // Show loading state if orderData is not yet set

  // Function to generate and download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const { customer, products, pricing } = orderData;

    // Add Order Title
    doc.setFontSize(18);
    doc.text("Order Invoice", 14, 20);
    doc.setFontSize(12);

    // Order Details
    doc.text(`Order Number: ${orderData.orderNumber}`, 14, 30);
    doc.text(`Placed on: ${orderData.orderDate}`, 14, 35);
    doc.text(`Status: ${orderData.status}`, 14, 40);

    // Customer Info
    doc.text(`Customer: ${customer.name}`, 14, 50);
    doc.text(`Email: ${customer.email}`, 14, 55);
    doc.text(`Phone: ${customer.phone}`, 14, 60);
    doc.text(`Shipping Address: ${customer.shippingAddress}`, 14, 65);
    doc.text(`Billing Address: ${customer.billingAddress}`, 14, 70);

    // Order Items
    doc.text("Order Items:", 14, 80);
    let yPosition = 85;
    products.forEach((product) => {
      doc.text(
        `${product.name} - Qty: ${product.quantity} - $${product.price} each`,
        14,
        yPosition
      );
      yPosition += 5;
      doc.text(`Subtotal: $${product.subtotal}`, 14, yPosition);
      yPosition += 10; // Add space between products
    });

    // Pricing Summary
    doc.text(`Subtotal: $${pricing.subtotal}`, 14, yPosition);
    yPosition += 5;
    doc.text(`Shipping: $${pricing.shipping}`, 14, yPosition);
    yPosition += 5;
    doc.text(`Tax: $${pricing.tax}`, 14, yPosition);
    yPosition += 5;
    doc.text(`Total: $${pricing.total}`, 14, yPosition);

    // Save the PDF
    doc.save(`Order_${orderData.orderNumber}.pdf`);
  };
  return (
    <div>
      {!orderData ? (
        <div></div>
      ) : (
        <div
          className={`${
            theme == "dark" ? "bg-gray-900 " : ""
          }min-h-screen bg-texture pt-32 py-8 px-4 sm:px-6 lg:px-8`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Order Header */}

            <div
              className={`${
                theme === "dark" ? "bg-gray-700/[0.5]" : "bg-white"
              } rounded-lg shadow-sm p-6 mb-6`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h1
                    className={`${
                      theme == "dark" ? "text-white" : "text-gray-900"
                    } text-2xl font-bold `}
                  >
                    Order Details
                  </h1>
                  <p
                    className={`${
                      theme == "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Order #{orderData.orderNumber}
                  </p>
                  <p
                    className={`${
                      theme == "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Placed on {orderData.orderDate}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={downloadPDF}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <FiDownload className="mr-2" /> Download Invoice
                  </button>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-8">
                <div className="flex justify-between">
                  {orderData.timeline.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? "bg-green-500" : "bg-gray-200"
                        }`}
                      >
                        <span className="text-white text-sm">{index + 1}</span>
                      </div>
                      <p
                        className={`mt-2 text-sm ${
                          theme == "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {step.status}
                      </p>
                      <p
                        className={`${
                          theme == "dark" ? "text-gray-200" : "text-gray-400"
                        } text-xs`}
                      >
                        {step.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer Details */}
              <div className="lg:col-span-1">
                <div
                  className={`${
                    theme == "dark" ? "bg-gray-700/[0.5] " : "bg-white"
                  } rounded-lg shadow-sm p-6`}
                >
                  <h2
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    } text-lg font-semibold mb-4`}
                  >
                    Customer Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Name
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-white" : "text-black"
                        } mt-1`}
                      >
                        {orderData.customer.name}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Email
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-white" : "text-black"
                        } mt-1`}
                      >
                        {orderData.customer.email}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Phone
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-white" : "text-black"
                        } mt-1`}
                      >
                        {orderData.customer.phone}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Shipping Address
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-white" : "text-black"
                        } mt-1`}
                      >
                        {orderData.customer.shippingAddress}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Billing Address
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          theme == "dark" ? "text-white" : "text-black"
                        } mt-1`}
                      >
                        {orderData.customer.billingAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="lg:col-span-2">
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-700/[0.5]" : "bg-white"
                  } rounded-lg shadow-sm p-6`}
                >
                  <h2
                    className={`${
                      theme == "dark" ? "text-white" : "text-black"
                    } text-lg font-semibold mb-4 `}
                  >
                    Order Items
                  </h2>
                  <div className="space-y-4">
                    {orderData.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center border-b pb-4"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="ml-4 flex-1">
                          <h3
                            className={`${
                              theme == "dark" ? "text-white" : "text-black"
                            } text-lg font-medium`}
                          >
                            {product.name}
                          </h3>
                          <div className="flex justify-between mt-2">
                            <p
                              className={`${
                                theme == "dark"
                                  ? "text-gray-300"
                                  : "text-gray-600"
                              } `}
                            >
                              Quantity: {product.quantity} x ${product.price}
                            </p>
                            <p
                              className={`${
                                theme == "dark"
                                  ? "text-gray-300"
                                  : "text-gray-600"
                              } font medium`}
                            >
                              ${product.subtotal}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Summary */}
                  <div className="mt-6 border-t pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span
                          className={`${
                            theme == "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Subtotal
                        </span>
                        <span
                          className={`${
                            theme == "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          ${orderData.pricing.subtotal}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={`${
                            theme == "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Shipping
                        </span>
                        <span
                          className={`${
                            theme == "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          ${orderData.pricing.shipping}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={`${
                            theme == "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Tax
                        </span>
                        <span
                          className={`${
                            theme == "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          ${orderData.pricing.tax}
                        </span>
                      </div>

                      <div className="flex justify-between pt-4 border-t">
                        <span
                          className={`${
                            theme == "dark" ? "text-gray-400" : "text-gray-600"
                          } font-semibold`}
                        >
                          Total
                        </span>
                        <span
                          className={`${
                            theme == "dark" ? "text-gray-400" : "text-gray-600"
                          } font-semibold`}
                        >
                          ${orderData.pricing.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Section */}
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-700/[0.5]" : "bg-white"
                  } mt-6 rounded-lg shadow-sm p-6`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2
                        className={`${
                          theme == "dark" ? "text-white" : "text-black"
                        } text-lg font-semibold`}
                      >
                        Need Help?
                      </h2>
                      <p
                        className={`${
                          theme == "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Contact our support team
                      </p>
                    </div>
                    <Link to={"/contact"}>
                      <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        <FiMessageCircle className="mr-2" /> Contact Support
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;

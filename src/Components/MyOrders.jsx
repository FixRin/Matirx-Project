
const OrderTracking = () => {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Order #54879</h1>
            <a href="#" className="text-indigo-600 text-sm hover:underline">
              View invoice →
            </a>
          </div>
          <div className="text-sm text-gray-600">Order placed March 22, 2021</div>
        </header>
  
        <main className="space-y-6">
          {/* First Item */}
          <article className="border rounded-lg p-6">
            <div className="flex gap-6">
              <img src="/placeholder.svg" alt="Nomad Tumbler" className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1 grid grid-cols-3 gap-6">
                <div>
                  <h2 className="font-medium">Nomad Tumbler</h2>
                  <div className="text-gray-600 mt-1">$35.00</div>
                  <p className="text-sm text-gray-500 mt-2">
                    This durable and portable insulated tumbler will keep your beverage at the perfect temperature during
                    your next adventure.
                  </p>
                </div>
  
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Delivery address</h3>
                  <address className="mt-1 not-italic">
                    Floyd Miles
                    <br />
                    7363 Cynthia Pass
                    <br />
                    Toronto, ON N3Y 4H8
                  </address>
                </div>
  
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Shipping updates</h3>
                  <div className="mt-1">
                    <div>f•••@example.com</div>
                    <div>1•••••••••40</div>
                    <button className="text-indigo-600 text-sm mt-1 hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="mt-6">
              <div className="text-sm text-gray-600 mb-4">Preparing to ship on March 24, 2021</div>
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-600 rounded-full w-1/3"></div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-indigo-600 font-medium">Order placed</span>
                  <span className="text-indigo-600 font-medium">Processing</span>
                  <span className="text-gray-500">Shipped</span>
                  <span className="text-gray-500">Delivered</span>
                </div>
              </div>
            </div>
          </article>
  
          {/* Second Item */}
          <article className="border rounded-lg p-6">
            <div className="flex gap-6">
              <img src="/placeholder.svg" alt="Minimalist Wristwatch" className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1 grid grid-cols-3 gap-6">
                <div>
                  <h2 className="font-medium">Minimalist Wristwatch</h2>
                  <div className="text-gray-600 mt-1">$149.00</div>
                  <p className="text-sm text-gray-500 mt-2">
                    This contemporary wristwatch has a clean, minimalist look and high quality components.
                  </p>
                </div>
  
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Delivery address</h3>
                  <address className="mt-1 not-italic">
                    Floyd Miles
                    <br />
                    7363 Cynthia Pass
                    <br />
                    Toronto, ON N3Y 4H8
                  </address>
                </div>
  
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Shipping updates</h3>
                  <div className="mt-1">
                    <div>f•••@example.com</div>
                    <div>1•••••••••40</div>
                    <button className="text-indigo-600 text-sm mt-1 hover:underline">Edit</button>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="mt-6">
              <div className="text-sm text-gray-600 mb-4">Shipped on March 23, 2021</div>
              <div className="relative">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-600 rounded-full w-2/3"></div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-indigo-600 font-medium">Order placed</span>
                  <span className="text-indigo-600 font-medium">Processing</span>
                  <span className="text-indigo-600 font-medium">Shipped</span>
                  <span className="text-gray-500">Delivered</span>
                </div>
              </div>
            </div>
          </article>
        </main>
  
        <footer className="grid grid-cols-2 gap-6 mt-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Billing address</h3>
              <address className="mt-1 not-italic">
                Floyd Miles
                <br />
                7363 Cynthia Pass
                <br />
                Toronto, ON N3Y 4H8
              </address>
            </div>
  
            <div>
              <h3 className="text-sm font-medium text-gray-600">Payment information</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-block bg-blue-600 text-white px-2 py-1 text-xs rounded">VISA</span>
                <span>Ending with 4242</span>
                <span className="text-gray-500">Expires 02 / 24</span>
              </div>
            </div>
          </div>
  
          <div className="space-y-4">
            <dl>
              <div className="flex justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium">$72.00</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="font-medium">$5.00</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium">$6.16</dd>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <dt className="font-medium">Order total</dt>
                <dd className="font-medium text-indigo-600">$83.16</dd>
              </div>
            </dl>
          </div>
        </footer>
      </div>
    )
  }
  
  export default OrderTracking
  
  
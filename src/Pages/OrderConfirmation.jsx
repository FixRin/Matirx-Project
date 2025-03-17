function OrderConfirmation() {
    return (
        <div className="w-100 bg-texture">
      <div className="max-w-2xl mx-auto p-6 py-24 font-sans">
        <div className="mb-6">
          <p className="text-purple-600 font-medium text-sm">Thank you!</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">It's on the way!</h1>
          <p className="text-gray-600 text-sm">Your order #14D24756 has shipped and will be with you soon.</p>
        </div>
  
        <div className="mb-6">
          <p className="text-sm font-medium mb-1">Tracking number</p>
          <p className="text-purple-600 text-sm">9124787879554284812</p>
        </div>
  
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src="https://via.placeholder.com/40x80"
                alt="Cold Brew Bottle"
                className="object-contain"
                style={{ width: "40px", height: "80px" }}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Cold Brew Bottle</h3>
              <p className="text-sm text-gray-600 mb-4">
                This glass bottle comes with a mesh insert for steeping tea or cold brewing coffee. Pour from any angle
                and remove the top for easy cleaning.
              </p>
              <div className="flex justify-between">
                <p className="text-sm">Quantity: 1</p>
                <p className="text-sm">Price: $32.00</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-amber-600 mb-2">Shipping address</h3>
            <div className="text-sm text-gray-600">
              <p>Maria Rodriguez</p>
              <p>7363 Cynthia Pass</p>
              <p>Toronto, ON M3Y 4H8</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-amber-600 mb-2">Billing address</h3>
            <div className="text-sm text-gray-600">
              <p>Maria Rodriguez</p>
              <p>7363 Cynthia Pass</p>
              <p>Toronto, ON M3Y 4H8</p>
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-amber-600 mb-2">Payment method</h3>
            <div className="text-sm text-gray-600">
              <p>Apple Pay</p>
              <p>Mastercard</p>
              <p>••••3456</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-amber-600 mb-2">Shipping method</h3>
            <div className="text-sm text-gray-600">
              <p>DHL</p>
              <p>Takes up to 3 working days</p>
            </div>
          </div>
        </div>
  
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Subtotal</p>
            <p className="text-sm font-medium">$36.00</p>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex gap-2">
              <p className="text-sm text-gray-600">Discount</p>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">STUDENT15</span>
            </div>
            <p className="text-sm font-medium text-red-600">-$18.00 (50%)</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Shipping</p>
            <p className="text-sm font-medium">$5.00</p>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <p className="text-sm font-medium">Total</p>
            <p className="text-sm font-bold">$23.00</p>
          </div>
        </div>
      </div>
      </div>
    )
  }
  
  export default OrderConfirmation
  
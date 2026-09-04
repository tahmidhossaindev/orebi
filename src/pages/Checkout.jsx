import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '@/components/Container'
import Button from '@/components/Common/Button'
import { useCartStore } from '@/store/useCartStore'
import { FaCheckCircle } from 'react-icons/fa'

const countries = [
  'United States',
  'United Kingdom',
  'Bangladesh',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Japan',
]

const Checkout = () => {
  const { cart, clearCart } = useCartStore()

  // Coupon Toggle & State
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'United States',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    county: '',
    postCode: '',
    phone: '',
    email: '',
    otherNotes: '',
  })

  // Payment Method Selection ('bank' | 'bank2')
  const [paymentMethod, setPaymentMethod] = useState('bank')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Calculate Totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * discountPercent) / 100
  const finalTotal = Math.max(0, subtotal - discountAmount)

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    const trimmed = couponCode.trim().toUpperCase()
    if (trimmed === 'OREBI10' || trimmed === 'DISCOUNT10') {
      setDiscountPercent(10)
      setCouponMessage('10% coupon applied successfully!')
    } else if (trimmed === 'OREBI20') {
      setDiscountPercent(20)
      setCouponMessage('20% coupon applied successfully!')
    } else if (trimmed === '') {
      setCouponMessage('Please enter a coupon code.')
    } else {
      setDiscountPercent(0)
      setCouponMessage('Invalid coupon code. Try OREBI10')
    }
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to checkout.')
      return
    }
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <Container className="py-20 font-orebi">
        <div className="max-w-xl mx-auto text-center p-10 border border-[#F0F0F0] bg-[#F9F9F9]">
          <FaCheckCircle className="text-emerald-500 text-6xl mx-auto mb-6" />
          <h2 className="text-[28px] font-bold text-[#262626] mb-3">Order Received!</h2>
          <p className="text-[#767676] mb-2 text-[15px]">
            Thank you, <strong>{formData.firstName || 'Customer'}</strong>. Your order has been placed successfully.
          </p>
          <p className="text-[#767676] mb-8 text-[14px]">
            Order number: <strong>#ORB-{Math.floor(100000 + Math.random() * 900000)}</strong>
          </p>
          <div className="flex justify-center gap-x-4">
            <Link to="/shop">
              <Button className="px-8 py-3.5 text-[14px]">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-14 md:py-20 font-orebi">
      {/* Breadcrumb Header */}
      <div className="titlePart mb-10 md:mb-14">
        <h1 className="font-orebi font-bold text-[#262626] text-[36px] md:text-[49px]">Checkout</h1>
        <p className="text-[12px] text-[#767676] font-orebi">
          <Link to="/" className="hover:text-[#262626]">Home</Link> &gt; Checkout
        </p>
      </div>

      {/* Top Coupon Prompt Banner */}
      <div className="mb-12">
        <div className="p-4 bg-[#F5F5F3] border border-[#F0F0F0] text-[15px] text-[#767676]">
          Have a coupon?{' '}
          <button
            type="button"
            onClick={() => setShowCouponInput((prev) => !prev)}
            className="text-[#262626] font-bold hover:underline cursor-pointer"
          >
            Click here to enter your code
          </button>
        </div>

        {/* Collapsible Coupon Input Field */}
        {showCouponInput && (
          <div className="mt-4 p-6 border border-[#F0F0F0] bg-white max-w-lg">
            <p className="text-[14px] text-[#767676] mb-4">
              If you have a coupon code, please apply it below.
            </p>
            <div className="flex items-center gap-x-4">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border border-[#F0F0F0] px-4 py-2.5 text-[14px] outline-none flex-1 placeholder:text-[#C4C4C4]"
              />
              <Button
                type="button"
                onClick={handleApplyCoupon}
                className="px-6 py-2.5 text-[14px] hover:px-7 hover:py-3 hover:text-[15px]"
              >
                Apply
              </Button>
            </div>
            {couponMessage && (
              <p
                className={`mt-2 text-[13px] ${discountPercent > 0 ? 'text-emerald-600' : 'text-red-500'
                  }`}
              >
                {couponMessage}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Main Checkout Grid: Form (Left) & Order Summary (Right) */}
      <form onSubmit={handleOrderSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Billing Details Form */}
          <div className="lg:col-span-7">
            <h2 className="font-bold text-[28px] md:text-[34px] text-[#262626] mb-8">
              Billing Details
            </h2>

            <div className="space-y-6">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border-b border-[#D8D8D8] pb-1">
                  <label className="block font-bold text-[16px] text-[#262626] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                  />
                </div>

                <div className="border-b border-[#D8D8D8] pb-1">
                  <label className="block font-bold text-[16px] text-[#262626] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                  />
                </div>
              </div>

              {/* Company Name (optional) */}
              <div className="border-b border-[#D8D8D8] pb-1">
                <label className="block font-bold text-[16px] text-[#262626] mb-1">
                  Company Name (optional)
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                />
              </div>

              {/* Country */}
              <div className="border-b border-[#D8D8D8] pb-1">
                <label className="block font-bold text-[16px] text-[#262626] mb-1">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent cursor-pointer"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Street Address */}
              <div className="space-y-4">
                <div className="border-b border-[#D8D8D8] pb-1">
                  <label className="block font-bold text-[16px] text-[#262626] mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    name="streetAddress1"
                    value={formData.streetAddress1}
                    onChange={handleInputChange}
                    placeholder="House number and street name"
                    className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                  />
                </div>

                <div className="border-b border-[#D8D8D8] pb-1">
                  <input
                    type="text"
                    name="streetAddress2"
                    value={formData.streetAddress2}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit etc. (optional)"
                    className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                  />
                </div>
              </div>

              {/* Town / City */}
              <div className="border-b border-[#D8D8D8] pb-1">
                <label className="block font-bold text-[16px] text-[#262626] mb-1">
                  Town / City *
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Town / City"
                  className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                />
              </div>

              {/* County (optional) */}
              <div className="border-b border-[#D8D8D8] pb-1">
                <label className="block font-bold text-[16px] text-[#262626] mb-1">
                  County (optional)
                </label>
                <input
                  type="text"
                  name="county"
                  value={formData.county}
                  onChange={handleInputChange}
                  placeholder="County"
                  className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                />
              </div>

              {/* Post Code */}
              <div className="border-b border-[#D8D8D8] pb-1">
                <label className="block font-bold text-[16px] text-[#262626] mb-1">
                  Post Code *
                </label>
                <input
                  type="text"
                  required
                  name="postCode"
                  value={formData.postCode}
                  onChange={handleInputChange}
                  placeholder="Post Code"
                  className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                />
              </div>

              {/* Phone & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border-b border-[#D8D8D8] pb-1">
                  <label className="block font-bold text-[16px] text-[#262626] mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                  />
                </div>

                <div className="border-b border-[#D8D8D8] pb-1">
                  <label className="block font-bold text-[16px] text-[#262626] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4]"
                  />
                </div>
              </div>

              {/* Additional Information: Other Notes */}
              <div className="pt-6">
                <h3 className="font-bold text-[22px] text-[#262626] mb-4">
                  Additional Information
                </h3>
                <div className="border-b border-[#D8D8D8] pb-2">
                  <label className="block font-bold text-[16px] text-[#262626] mb-1">
                    Other Notes (optional)
                  </label>
                  <textarea
                    rows={3}
                    name="otherNotes"
                    value={formData.otherNotes}
                    onChange={handleInputChange}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    className="w-full py-2 text-[16px] text-[#767676] outline-none bg-transparent placeholder:text-[#C4C4C4] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: "Your Order" & Payment Section */}
          <div className="lg:col-span-5 w-full">
            <h2 className="font-bold text-[28px] md:text-[34px] text-[#262626] mb-8">
              Your Order
            </h2>

            {/* Order Summary Table */}
            <div className="border border-[#F0F0F0] mb-8">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-[#F0F0F0] bg-[#F5F5F3] font-bold text-[16px] text-[#262626]">
                <span>Product</span>
                <span>Total</span>
              </div>

              {/* Items */}
              <div className="divide-y divide-[#F0F0F0]">
                {cart.length === 0 ? (
                  <div className="p-6 text-center text-[#767676] text-[15px]">
                    Your cart is empty.{' '}
                    <Link to="/shop" className="text-[#262626] font-bold hover:underline">
                      Shop now
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center px-6 py-4 text-[15px]"
                    >
                      <span className="text-[#262626] font-medium pr-4">
                        {item.title}{' '}
                        <strong className="text-[#767676] font-normal">
                          x {item.quantity}
                        </strong>
                      </span>
                      <span className="text-[#767676] font-medium flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}

                {/* Subtotal */}
                <div className="flex justify-between items-center px-6 py-4 text-[15px] border-t border-[#F0F0F0]">
                  <span className="font-bold text-[#262626]">Subtotal</span>
                  <span className="text-[#767676] font-bold">${subtotal.toFixed(2)}</span>
                </div>

                {/* Discount (if coupon applied) */}
                {discountPercent > 0 && (
                  <div className="flex justify-between items-center px-6 py-4 text-[15px] bg-emerald-50/50">
                    <span className="font-bold text-emerald-700">
                      Discount ({discountPercent}%)
                    </span>
                    <span className="font-bold text-emerald-700">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center px-6 py-4 text-[16px] border-t border-[#F0F0F0] bg-[#F9F9F9]/50">
                  <span className="font-bold text-[#262626]">Total</span>
                  <span className="font-bold text-[18px] text-[#262626]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="border border-[#F0F0F0] p-6 mb-8 bg-white">
              {/* Radio Option 1: Bank */}
              <div className="mb-4">
                <label className="flex items-center gap-x-3 cursor-pointer font-bold text-[16px] text-[#262626]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="accent-[#262626] w-4 h-4 cursor-pointer"
                  />
                  <span>Bank</span>
                </label>

                {paymentMethod === 'bank' && (
                  <div className="p-4 bg-[#F5F5F3] text-[14px] text-[#767676] mt-3 leading-relaxed border-l-2 border-[#262626]">
                    Make your payment directly into our bank account. Please use your Order ID as the
                    payment reference. Your order will not be shipped until the funds have cleared in
                    our account.
                  </div>
                )}
              </div>

              {/* Radio Option 2: Bank 2 */}
              <div className="mb-4">
                <label className="flex items-center gap-x-3 cursor-pointer font-bold text-[16px] text-[#262626]">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank2"
                    checked={paymentMethod === 'bank2'}
                    onChange={() => setPaymentMethod('bank2')}
                    className="accent-[#262626] w-4 h-4 cursor-pointer"
                  />
                  <span>Bank 2</span>
                </label>

                {paymentMethod === 'bank2' && (
                  <div className="p-4 bg-[#F5F5F3] text-[14px] text-[#767676] mt-3 leading-relaxed border-l-2 border-[#262626]">
                    Pay securely via Bank 2 alternative gateway. All transactions are protected by
                    256-bit SSL encryption.
                  </div>
                )}
              </div>

              {/* Privacy Policy Notice */}
              <p className="text-[13px] text-[#767676] mt-6 leading-relaxed pt-4 border-t border-[#F0F0F0]">
                Your personal data will be used to process your order, support your experience
                throughout this website, and for other purposes described in our privacy policy.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-4 text-[14px] md:text-[16px] font-bold"
            >
              Proceed to Bank
            </Button>
          </div>
        </div>
      </form>
    </Container>
  )
}

export default Checkout

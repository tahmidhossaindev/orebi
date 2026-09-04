import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '@/components/Container'
import Button from '@/components/Common/Button'
import { useCartStore } from '@/store/useCartStore'
import { IoClose } from 'react-icons/io5'
import { FaShoppingCart } from 'react-icons/fa'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [updateNotification, setUpdateNotification] = useState('')

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * appliedDiscount) / 100
  const finalTotal = Math.max(0, subtotal - discountAmount)

  const handleApplyCoupon = () => {
    const trimmed = couponCode.trim().toUpperCase()
    if (trimmed === 'OREBI10' || trimmed === 'DISCOUNT10') {
      setAppliedDiscount(10)
      setCouponMessage('10% discount applied successfully!')
    } else if (trimmed === 'OREBI20') {
      setAppliedDiscount(20)
      setCouponMessage('20% discount applied successfully!')
    } else if (trimmed === '') {
      setCouponMessage('Please enter a coupon code.')
    } else {
      setAppliedDiscount(0)
      setCouponMessage('Invalid coupon code. Try OREBI10')
    }
  }

  const handleUpdateCart = () => {
    setUpdateNotification('Cart updated successfully!')
    setTimeout(() => setUpdateNotification(''), 2500)
  }

  return (
    <Container className="py-16 md:py-24">
      {/* Title & Breadcrumbs */}
      <div className="titlePart mb-12 md:mb-16">
        <h1 className="font-orebi font-bold text-[#262626] text-[36px] md:text-[49px]">Cart</h1>
        <p className="text-[12px] text-[#767676] font-orebi">
          <Link to="/" className="hover:text-[#262626]">Home</Link> &gt; Cart
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="py-16 text-center font-orebi">
          <div className="w-20 h-20 bg-[#F5F5F3] rounded-full flex items-center justify-center mx-auto mb-6 text-[#767676]">
            <FaShoppingCart className="text-[32px]" />
          </div>
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#262626] mb-3">
            Your Cart is currently empty.
          </h2>
          <p className="text-[16px] text-[#767676] mb-8 max-w-md mx-auto">
            Explore our collections and add your favorite items to the shopping cart.
          </p>
          <Link to="/shop">
            <Button className="px-10 py-4 text-[14px] hover:px-11 hover:py-4.5 hover:text-[15px]">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Notification feedback banner */}
          {updateNotification && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 font-orebi text-sm">
              {updateNotification}
            </div>
          )}

          {/* Cart Table */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Header Row */}
              <div className="bg-[#F5F5F3] px-6 py-4 grid grid-cols-12 font-orebi font-bold text-[#262626] text-[16px]">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-3">Quantity</div>
                <div className="col-span-2 text-right md:text-left">Total</div>
              </div>

              {/* Items Rows */}
              <div className="divide-y divide-[#F0F0F0] border-x border-b border-[#F0F0F0]">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="px-6 py-6 grid grid-cols-12 items-center font-orebi hover:bg-neutral-50/50 transition-colors"
                  >
                    {/* Product Name, Thumbnail, and Delete Cross */}
                    <div className="col-span-5 flex items-center gap-x-4 md:gap-x-6 pr-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#262626] hover:text-red-500 transition-colors p-1 cursor-pointer flex-shrink-0"
                        title="Remove product"
                        aria-label={`Remove ${item.title}`}
                      >
                        <IoClose className="text-[20px]" />
                      </button>

                      <div className="w-20 h-20 bg-[#F5F5F3] flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#E5E5E5]" />
                        )}
                      </div>

                      <h4
                        className="font-bold text-[14px] md:text-[16px] text-[#262626] line-clamp-2"
                        title={item.title}
                      >
                        {item.title}
                      </h4>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2 font-bold text-[16px] text-[#262626]">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="col-span-3">
                      <div className="flex items-center justify-between border border-[#F0F0F0] w-32 md:w-36 px-3 py-1.5 md:py-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#767676] hover:text-[#262626] cursor-pointer text-lg font-bold select-none px-1"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="font-bold text-[16px] text-[#262626]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#767676] hover:text-[#262626] cursor-pointer text-lg font-bold select-none px-1"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total Price for Line Item */}
                    <div className="col-span-2 font-bold text-[16px] text-[#262626] text-right md:text-left">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Toolbar */}
              <div className="border border-t-0 border-[#F0F0F0] p-5 flex flex-wrap items-center justify-between gap-4 font-orebi bg-white">
                <div className="flex flex-wrap items-center gap-6">
                  {/* Size select dropdown */}
                  <select
                    className="border border-[#F0F0F0] px-4 py-2.5 text-[14px] text-[#767676] font-orebi outline-none bg-white cursor-pointer"
                    defaultValue="SIZE"
                  >
                    <option value="SIZE">SIZE</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>

                  {/* Coupon code input & apply */}
                  <div className="flex items-center gap-x-4">
                    <input
                      type="text"
                      placeholder="Coupon code (e.g. OREBI10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border border-[#F0F0F0] px-4 py-2.5 text-[14px] font-orebi outline-none w-44 md:w-56 placeholder:text-[#C4C4C4]"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="text-[14px] font-bold text-[#262626] hover:underline underline-offset-4 cursor-pointer transition-all"
                    >
                      Apply coupon
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-x-6">
                  <button
                    onClick={clearCart}
                    className="text-[14px] font-bold text-[#262626] hover:text-red-600 hover:underline underline-offset-4 cursor-pointer transition-all"
                  >
                    Clear cart
                  </button>

                  <button
                    onClick={handleUpdateCart}
                    className="text-[14px] font-bold text-[#262626] hover:underline underline-offset-4 cursor-pointer transition-all"
                  >
                    Update cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Coupon feedback message */}
          {couponMessage && (
            <p className={`mt-3 font-orebi text-[14px] ${appliedDiscount > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {couponMessage}
            </p>
          )}

          {/* Cart Totals Summary Card */}
          <div className="mt-14 flex flex-col items-end font-orebi">
            <h3 className="font-bold text-[20px] text-[#262626] mb-6 text-right w-full max-w-md">
              Cart totals
            </h3>
            <div className="w-full max-w-md border border-[#F0F0F0]">
              <div className="flex border-b border-[#F0F0F0]">
                <div className="w-1/2 p-4 border-r border-[#F0F0F0] font-bold text-[16px] text-[#262626]">
                  Subtotal
                </div>
                <div className="w-1/2 p-4 text-[#767676] text-[16px]">
                  ${subtotal.toFixed(2)}
                </div>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex border-b border-[#F0F0F0] bg-emerald-50/50">
                  <div className="w-1/2 p-4 border-r border-[#F0F0F0] font-bold text-[16px] text-emerald-700">
                    Discount ({appliedDiscount}%)
                  </div>
                  <div className="w-1/2 p-4 text-emerald-700 font-bold text-[16px]">
                    -${discountAmount.toFixed(2)}
                  </div>
                </div>
              )}

              <div className="flex">
                <div className="w-1/2 p-4 border-r border-[#F0F0F0] font-bold text-[16px] text-[#262626]">
                  Total
                </div>
                <div className="w-1/2 p-4 font-bold text-[16px] text-[#262626]">
                  ${finalTotal.toFixed(2)}
                </div>
              </div>
            </div>

            <Link to="/checkout" className="block mt-8">
              <Button className="w-full sm:w-auto px-8 py-4 text-[14px] md:text-[16px] hover:px-9 hover:py-4.5 hover:text-[17px]">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  )
}

export default Cart

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Container from '@/components/Container'
import Button from '@/components/Common/Button'
import { useProductStore } from '@/store/useProductStore'
import { useCartStore } from '@/store/useCartStore'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FaStar, FaRegStar, FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa'

const swatchColors = [
  { name: 'Black', hex: '#000000' },
  { name: 'Red', hex: '#FF6B6B' },
  { name: 'Green', hex: '#4ADE80' },
  { name: 'Gray', hex: '#9CA3AF' },
  { name: 'Blue', hex: '#3B82F6' },
]

const ProductDetails = () => {
  const { id } = useParams()
  const { selectedProduct, isLoadingDetail, fetchProductById, addReviewToProduct } = useProductStore()
  const addToCart = useCartStore((state) => state.addToCart)

  // Interactive UI States
  const [selectedColor, setSelectedColor] = useState('Black')
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description') // 'description' | 'reviews'
  const [isAdded, setIsAdded] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Review Form States
  const [reviewName, setReviewName] = useState('')
  const [reviewEmail, setReviewEmail] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewSuccess, setReviewSuccess] = useState(false)

  useEffect(() => {
    if (id) {
      fetchProductById(id)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [id, fetchProductById])

  if (isLoadingDetail && !selectedProduct) {
    return (
      <Container className="py-20 font-orebi">
        <div className="animate-pulse">
          <div className="h-6 bg-[#E5E5E5] w-48 mb-12 rounded"></div>
          <div className="grid grid-cols-2 gap-6 mb-16">
            <div className="h-96 bg-[#F5F5F3] rounded"></div>
            <div className="h-96 bg-[#F5F5F3] rounded"></div>
          </div>
          <div className="h-10 bg-[#E5E5E5] w-2/3 mb-6 rounded"></div>
          <div className="h-6 bg-[#E5E5E5] w-1/4 mb-10 rounded"></div>
        </div>
      </Container>
    )
  }

  if (!selectedProduct) {
    return (
      <Container className="py-24 text-center font-orebi">
        <h2 className="text-[28px] font-bold text-[#262626] mb-4">Product Not Found</h2>
        <p className="text-[#767676] mb-8">The requested product could not be located.</p>
        <Link to="/shop">
          <Button className="px-8 py-3.5 text-[14px]">Back to Shop</Button>
        </Link>
      </Container>
    )
  }

  const {
    title,
    price = 0,
    discountPercentage = 0,
    rating = 4.5,
    description = '',
    category = '',
    brand = '',
    stock = 0,
    dimensions,
    weight,
    warrantyInformation = '1 Year Official Warranty',
    shippingInformation = 'Free standard shipping in 3-5 business days',
    returnPolicy = '30 days return & exchange policy',
    reviews = [],
    images = [],
    thumbnail,
  } = selectedProduct

  // Prepare 4 images for the 2x2 grid
  const galleryImages = []
  if (images && images.length > 0) {
    for (let i = 0; i < 4; i++) {
      galleryImages.push(images[i % images.length] || thumbnail)
    }
  } else {
    galleryImages.push(thumbnail, thumbnail, thumbnail, thumbnail)
  }

  // Pricing calculations
  const originalPrice = discountPercentage > 0
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null

  const handleAddToCart = () => {
    addToCart(
      {
        id: selectedProduct.id,
        title,
        price,
        thumbnail: thumbnail || images?.[0],
        category,
        color: selectedColor,
        size: selectedSize,
      },
      quantity
    )
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!reviewName.trim() || !reviewText.trim()) return

    const newReview = {
      reviewerName: reviewName.trim(),
      reviewerEmail: reviewEmail.trim(),
      comment: reviewText.trim(),
      rating: Number(reviewRating),
      date: new Date().toISOString(),
    }

    addReviewToProduct(newReview)
    setReviewSuccess(true)
    setReviewName('')
    setReviewEmail('')
    setReviewText('')
    setTimeout(() => setReviewSuccess(false), 3000)
  }

  return (
    <Container className="py-14 md:py-20 font-orebi">
      {/* Breadcrumbs */}
      <div className="mb-10 text-[12px] text-[#767676]">
        <Link to="/" className="hover:text-[#262626]">Home</Link>
        <span className="mx-2">&gt;</span>
        <Link to="/shop" className="hover:text-[#262626]">Products</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-[#262626] font-bold">{title}</span>
      </div>

      {/* 2x2 Multi-Image Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-16">
        {galleryImages.map((imgSrc, idx) => (
          <div
            key={idx}
            className="w-full h-72 sm:h-80 md:h-96 lg:h-110 bg-[#F5F5F3] flex items-center justify-center p-6 md:p-8 overflow-hidden group border border-[#F0F0F0]"
          >
            <img
              src={imgSrc}
              alt={`${title} - view ${idx + 1}`}
              className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Product Overview Section */}
      <div className="max-w-3xl mb-16">
        <h1 className="font-bold text-[32px] md:text-[39px] text-[#262626] mb-4 leading-tight">
          {title}
        </h1>

        {/* Rating & Review Count */}
        <div className="flex items-center gap-x-3 mb-6">
          <div className="flex text-[#FFD800] text-[15px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {rating >= star ? <FaStar /> : <FaRegStar className="text-neutral-300" />}
              </span>
            ))}
          </div>
          <span className="text-[14px] text-[#767676]">
            ({reviews.length} customer review{reviews.length === 1 ? '' : 's'})
          </span>
          <span className="text-neutral-300">|</span>
          <span className="text-[14px] text-emerald-600 font-medium">
            {stock > 0 ? `${stock} In Stock` : 'Out of Stock'}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-x-4 mb-8 pb-6 border-b border-[#F0F0F0]">
          {originalPrice && (
            <span className="text-[16px] text-[#767676] line-through font-normal">
              ${originalPrice}
            </span>
          )}
          <span className="text-[24px] font-bold text-[#262626]">
            ${price.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <span className="text-[12px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
              Save {Math.round(discountPercentage)}%
            </span>
          )}
        </div>

        {/* Option Pickers: Color & Size */}
        <div className="space-y-6 mb-8 pb-6 border-b border-[#F0F0F0]">
          {/* Color Swatch Picker */}
          <div className="flex items-center gap-x-6">
            <span className="text-[16px] font-bold text-[#262626] w-20">COLOR:</span>
            <div className="flex items-center gap-x-3">
              {swatchColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-7 h-7 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                    selectedColor === color.name ? 'ring-2 ring-[#262626] ring-offset-2 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                >
                  {selectedColor === color.name && (
                    <span className={`w-2 h-2 rounded-full ${color.name === 'Black' ? 'bg-white' : 'bg-black'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Select */}
          <div className="flex items-center gap-x-6">
            <span className="text-[16px] font-bold text-[#262626] w-20">SIZE:</span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border border-[#F0F0F0] px-4 py-2 text-[14px] text-[#767676] bg-white outline-none cursor-pointer w-36"
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center gap-x-6">
            <span className="text-[16px] font-bold text-[#262626] w-20">QUANTITY:</span>
            <div className="flex items-center justify-between border border-[#F0F0F0] w-36 px-4 py-2">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="text-[#767676] hover:text-[#262626] cursor-pointer text-lg font-bold select-none"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="font-bold text-[16px] text-[#262626]">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="text-[#767676] hover:text-[#262626] cursor-pointer text-lg font-bold select-none"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-[#F0F0F0]">
          <Button
            onClick={handleAddToCart}
            className="px-10 py-4 text-[14px] md:text-[16px] flex items-center gap-x-2"
          >
            {isAdded ? (
              <>
                <FaCheck className="text-emerald-400" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <FaShoppingCart />
                <span>Add to Cart</span>
              </>
            )}
          </Button>

          <button
            onClick={() => setIsWishlisted((prev) => !prev)}
            className={`border border-[#F0F0F0] px-6 py-4 font-bold text-[14px] flex items-center gap-x-2 transition-colors cursor-pointer ${
              isWishlisted ? 'text-red-500 border-red-200 bg-red-50/40' : 'text-[#262626] hover:bg-neutral-50'
            }`}
          >
            <FaHeart className={isWishlisted ? 'text-red-500' : 'text-[#767676]'} />
            <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
          </button>
        </div>

        {/* Collapsible Accordions */}
        <Accordion defaultValue={['features']} className="w-full">
          {/* Features & Details */}
          <AccordionItem value="features" className="border-b border-[#F0F0F0] py-2">
            <AccordionTrigger className="font-bold text-[18px] text-[#262626] font-orebi py-3.5 hover:no-underline cursor-pointer items-center">
              FEATURES &amp; DETAILS
            </AccordionTrigger>
            <AccordionContent className="font-orebi pt-2 pb-4 text-[#767676] leading-relaxed">
              <div className="space-y-2 text-[14px]">
                {brand && <p><strong className="text-[#262626]">Brand:</strong> {brand}</p>}
                <p><strong className="text-[#262626]">Category:</strong> {category}</p>
                {weight && <p><strong className="text-[#262626]">Weight:</strong> {weight} kg</p>}
                {dimensions && (
                  <p>
                    <strong className="text-[#262626]">Dimensions:</strong> {dimensions.width} x {dimensions.height} x {dimensions.depth} cm
                  </p>
                )}
                <p><strong className="text-[#262626]">Warranty:</strong> {warrantyInformation}</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Shipping & Returns */}
          <AccordionItem value="shipping" className="border-b border-[#F0F0F0] py-2">
            <AccordionTrigger className="font-bold text-[18px] text-[#262626] font-orebi py-3.5 hover:no-underline cursor-pointer items-center">
              SHIPPING &amp; RETURNS
            </AccordionTrigger>
            <AccordionContent className="font-orebi pt-2 pb-4 text-[#767676] leading-relaxed">
              <div className="space-y-2 text-[14px]">
                <p><strong className="text-[#262626]">Delivery:</strong> {shippingInformation}</p>
                <p><strong className="text-[#262626]">Returns:</strong> {returnPolicy}</p>
                <p>We ensure all items are thoroughly checked and safely packaged before dispatch.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Tabs: Description & Reviews */}
      <div className="pt-10 border-t border-[#F0F0F0]">
        {/* Tab Headers */}
        <div className="flex items-center gap-x-8 mb-8 pb-4 border-b border-[#F0F0F0]">
          <button
            onClick={() => setActiveTab('description')}
            className={`text-[18px] md:text-[20px] font-bold cursor-pointer transition-colors ${
              activeTab === 'description' ? 'text-[#262626] border-b-2 border-[#262626] pb-4 -mb-4' : 'text-[#767676] hover:text-[#262626]'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-[18px] md:text-[20px] font-bold cursor-pointer transition-colors ${
              activeTab === 'reviews' ? 'text-[#262626] border-b-2 border-[#262626] pb-4 -mb-4' : 'text-[#767676] hover:text-[#262626]'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Content: Description */}
        {activeTab === 'description' && (
          <div className="max-w-4xl text-[#767676] text-[15px] leading-relaxed space-y-4">
            <p>{description}</p>
            <p>
              Crafted from premium grade materials designed for durability, comfort, and state-of-the-art aesthetics.
              Every piece in the Orebi collection is manufactured with precision and attention to detail.
            </p>
          </div>
        )}

        {/* Tab Content: Reviews & Review Form */}
        {activeTab === 'reviews' && (
          <div className="max-w-4xl space-y-12">
            {/* Reviews List */}
            <div className="space-y-6">
              <h3 className="font-bold text-[20px] text-[#262626]">
                {reviews.length > 0 ? `${reviews.length} review${reviews.length === 1 ? '' : 's'} for ${title}` : 'No reviews yet'}
              </h3>

              <div className="divide-y divide-[#F0F0F0] border-y border-[#F0F0F0]">
                {reviews.map((rev, i) => (
                  <div key={i} className="py-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-x-3">
                        <span className="font-bold text-[16px] text-[#262626]">
                          {rev.reviewerName || 'Customer'}
                        </span>
                        <div className="flex text-[#FFD800] text-[12px]">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s}>
                              {rev.rating >= s ? <FaStar /> : <FaRegStar className="text-neutral-300" />}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[12px] text-[#767676]">
                        {rev.date ? new Date(rev.date).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#767676] leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Add a Review Form */}
            <div className="bg-[#F9F9F9] p-6 md:p-8 border border-[#F0F0F0] rounded-sm max-w-2xl">
              <h4 className="font-bold text-[20px] text-[#262626] mb-2">Add a Review</h4>
              <p className="text-[14px] text-[#767676] mb-6">
                Your email address will not be published. Required fields are marked *
              </p>

              {reviewSuccess && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
                  Thank you! Your review has been added.
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="space-y-5">
                {/* Rating Input */}
                <div>
                  <label className="block text-[14px] font-bold text-[#262626] mb-2">
                    Rating *
                  </label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(e.target.value)}
                    className="border border-[#F0F0F0] px-4 py-2 bg-white text-[14px] outline-none cursor-pointer w-40"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Not Good</option>
                    <option value={1}>1 Star - Poor</option>
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[14px] font-bold text-[#262626] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-[#F0F0F0] px-4 py-3 bg-white text-[14px] outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[14px] font-bold text-[#262626] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={reviewEmail}
                    onChange={(e) => setReviewEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full border border-[#F0F0F0] px-4 py-3 bg-white text-[14px] outline-none"
                  />
                </div>

                {/* Review Textarea */}
                <div>
                  <label className="block text-[14px] font-bold text-[#262626] mb-2">
                    Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full border border-[#F0F0F0] px-4 py-3 bg-white text-[14px] outline-none"
                  />
                </div>

                <Button type="submit" className="px-8 py-3.5 text-[14px]">
                  Submit Review
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default ProductDetails

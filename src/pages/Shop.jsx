import React, { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Container from '@/components/Container'
import Product from '@/components/Common/Product'
import Button from '@/components/Common/Button'
import { useProductStore } from '@/store/useProductStore'
import ShopSidebar from '@/components/Shop/ShopSidebar'
import ShopToolbar from '@/components/Shop/ShopToolbar'
import ProductListItem from '@/components/Shop/ProductListItem'

const colors = [
  { name: 'Black', hex: '#000000' },
  { name: 'Red', hex: '#FF6B6B' },
  { name: 'Green', hex: '#4ADE80' },
  { name: 'Gray', hex: '#9CA3AF' },
  { name: 'Blue', hex: '#3B82F6' },
]

const priceRanges = [
  { label: '$0.00 - $49.99', min: 0, max: 49.99 },
  { label: '$50.00 - $99.99', min: 50, max: 99.99 },
  { label: '$100.00 - $199.99', min: 100, max: 199.99 },
  { label: '$200.00 - $499.99', min: 200, max: 499.99 },
  { label: '$500.00+', min: 500, max: Infinity },
]

const Shop = () => {
  const { products, isLoading, error, fetchProducts } = useProductStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All')
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(null)

  // View & Sort States
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    setSelectedCategory(categoryParam || 'All')
    setCurrentPage(1)
  }, [categoryParam])

  // Extract unique categories from loaded products
  const categories = useMemo(() => {
    const map = {}
    products.forEach((p) => {
      if (p.category) {
        map[p.category] = (map[p.category] || 0) + 1
      }
    })
    return Object.entries(map).map(([name, count]) => ({ name, count }))
  }, [products])

  // Extract unique brands from loaded products
  const brands = useMemo(() => {
    const map = {}
    products.forEach((p) => {
      if (p.brand) {
        map[p.brand] = (map[p.brand] || 0) + 1
      }
    })
    return Object.entries(map).map(([name, count]) => ({ name, count }))
  }, [products])

  // Reset page to 1 whenever filters change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    if (category === 'All') {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.delete('category')
      setSearchParams(nextParams)
    } else {
      setSearchParams({ category })
    }
  }

  const handleColorChange = (color) => {
    setSelectedColor(color)
    setCurrentPage(1)
  }

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand)
    setCurrentPage(1)
  }

  const handlePriceRangeChange = (index) => {
    setSelectedPriceIndex(index)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSelectedCategory('All')
    setSelectedColor(null)
    setSelectedBrand('All')
    setSelectedPriceIndex(null)
    setCurrentPage(1)
    setSearchParams({})
  }

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedColor !== null ||
    selectedBrand !== 'All' ||
    selectedPriceIndex !== null

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter (case-insensitive and space/hyphen tolerant)
        if (selectedCategory !== 'All') {
          const normProductCat = p.category?.toLowerCase().replace(/[-_\s]/g, '')
          const normSelectedCat = selectedCategory.toLowerCase().replace(/[-_\s]/g, '')
          if (normProductCat !== normSelectedCat) {
            return false
          }
        }
        // Brand filter
        if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
          return false
        }
        // Price filter
        if (selectedPriceIndex !== null) {
          const range = priceRanges[selectedPriceIndex]
          if (p.price < range.min || p.price > range.max) {
            return false
          }
        }
        // Color filter (simulated match via title, description, or tags)
        if (selectedColor !== null) {
          const target = selectedColor.toLowerCase()
          const matches =
            p.title?.toLowerCase().includes(target) ||
            p.description?.toLowerCase().includes(target) ||
            p.tags?.some((t) => t.toLowerCase().includes(target))
          if (!matches) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return a.price - b.price
        }
        if (sortBy === 'price-high') {
          return b.price - a.price
        }
        if (sortBy === 'newest') {
          return b.id - a.id
        }
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0)
        }
        return a.id - b.id // Default 'featured'
      })
  }, [products, selectedCategory, selectedBrand, selectedPriceIndex, selectedColor, sortBy])

  // Pagination Math
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Container className="py-16 md:py-24">
      {/* Title & Breadcrumb Header */}
      <div className="titlePart mb-12 md:mb-16">
        <h1 className="font-orebi font-bold text-[#262626] text-[36px] md:text-[49px]">Products</h1>
        <p className="text-[12px] text-[#767676] font-orebi">
          <Link to="/" className="hover:text-[#262626]">Home</Link> &gt; Products
        </p>
      </div>

      {/* Two-Column Responsive Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-y-12 lg:gap-x-12">
        {/* Left Sidebar Filters */}
        <aside className="w-full lg:w-1/4 flex-shrink-0">
          <ShopSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            colors={colors}
            selectedColor={selectedColor}
            onSelectColor={handleColorChange}
            brands={brands}
            selectedBrand={selectedBrand}
            onSelectBrand={handleBrandChange}
            priceRanges={priceRanges}
            selectedPriceIndex={selectedPriceIndex}
            onSelectPriceRange={handlePriceRangeChange}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        {/* Right Main Content */}
        <main className="w-full lg:w-3/4 flex-1">
          {/* Top Toolbar */}
          <ShopToolbar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={setSortBy}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(num) => {
              setItemsPerPage(num)
              setCurrentPage(1)
            }}
            totalResults={filteredProducts.length}
          />

          {/* Loading & Error States */}
          {isLoading && products.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-[#F5F5F3] h-80 w-full mb-5.5 rounded-sm"></div>
                  <div className="h-5 bg-[#E5E5E5] w-3/4 mb-2 rounded-sm"></div>
                  <div className="h-4 bg-[#E5E5E5] w-1/3 rounded-sm"></div>
                </div>
              ))}
            </div>
          ) : error && products.length === 0 ? (
            <div className="text-center py-16 font-orebi">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => fetchProducts(true)} className="px-6 py-2.5 text-[14px]">
                Retry
              </Button>
            </div>
          ) : paginatedProducts.length === 0 ? (
            /* Empty Filter Results State */
            <div className="text-center py-20 border border-[#F0F0F0] font-orebi bg-[#F9F9F9]/40">
              <h3 className="text-[20px] font-bold text-[#262626] mb-3">
                No products found matching your filters
              </h3>
              <p className="text-[14px] text-[#767676] mb-6 max-w-sm mx-auto">
                Try selecting different filter options or reset all filters to view all products.
              </p>
              <Button
                onClick={handleResetFilters}
                className="px-8 py-3 text-[14px] hover:px-9 hover:py-3.5 hover:text-[15px]"
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            /* Products Listing (Grid or List View) */
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {paginatedProducts.map((product) => (
                    <div key={product.id} className="w-full">
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col">
                  {paginatedProducts.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Bottom Pagination */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-[#F0F0F0] font-orebi">
                {/* Numbered Page Buttons */}
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 text-[14px] border ${
                      currentPage === 1
                        ? 'border-[#F0F0F0] text-[#C4C4C4] cursor-not-allowed'
                        : 'border-[#F0F0F0] text-[#767676] hover:text-[#262626] cursor-pointer'
                    }`}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 flex items-center justify-center text-[14px] border transition-colors cursor-pointer ${
                        currentPage === page
                          ? 'bg-[#262626] text-white border-[#262626] font-bold'
                          : 'bg-white text-[#767676] border-[#F0F0F0] hover:text-[#262626]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 text-[14px] border ${
                      currentPage === totalPages
                        ? 'border-[#F0F0F0] text-[#C4C4C4] cursor-not-allowed'
                        : 'border-[#F0F0F0] text-[#767676] hover:text-[#262626] cursor-pointer'
                    }`}
                  >
                    Next
                  </button>
                </div>

                {/* Results count text */}
                <p className="text-[14px] text-[#767676]">
                  Products from {Math.min(startIndex + 1, filteredProducts.length)} to{' '}
                  {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{' '}
                  {filteredProducts.length} results
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </Container>
  )
}

export default Shop
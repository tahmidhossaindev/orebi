import React from 'react'
import Button from '@/components/Common/Button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const ShopSidebar = ({
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  colors = [],
  selectedColor = null,
  onSelectColor,
  brands = [],
  selectedBrand = 'All',
  onSelectBrand,
  priceRanges = [],
  selectedPriceIndex = null,
  onSelectPriceRange,
  onResetFilters,
  hasActiveFilters = false,
}) => {
  return (
    <div className="w-full font-orebi pr-0 lg:pr-8">
      {/* Reset Filter Button */}
      {hasActiveFilters && (
        <div className="mb-6">
          <Button
            onClick={onResetFilters}
            className="w-full text-[14px] py-3.5 px-4 font-bold bg-red-600 hover:bg-red-700 hover:px-4 hover:py-3.5 hover:text-[14px]"
          >
            Reset All Filters
          </Button>
        </div>
      )}

      <Accordion defaultValue={['category', 'color', 'brand', 'price']} className="w-full">
        {/* Shop by Category */}
        <AccordionItem value="category" className="border-b border-[#F0F0F0] py-2">
          <AccordionTrigger className="font-bold text-[20px] text-[#262626] font-orebi py-3.5 hover:no-underline cursor-pointer items-center">
            Shop by Category
          </AccordionTrigger>
          <AccordionContent className="font-orebi pt-1 pb-4">
            <ul className="space-y-1 max-h-64 overflow-y-auto pr-1">
              <li
                onClick={() => onSelectCategory('All')}
                className={`flex items-center justify-between py-2 text-[15px] border-b border-[#F0F0F0] cursor-pointer transition-colors ${
                  selectedCategory === 'All'
                    ? 'font-bold text-[#262626]'
                    : 'text-[#767676] hover:text-[#262626]'
                }`}
              >
                <span>All Categories</span>
              </li>
              {categories.map((cat) => {
                const isSelected =
                  selectedCategory?.toLowerCase().replace(/[-_\s]/g, '') ===
                  cat.name.toLowerCase().replace(/[-_\s]/g, '')
                return (
                  <li
                    key={cat.name}
                    onClick={() => onSelectCategory(cat.name)}
                    className={`flex items-center justify-between py-2 text-[15px] capitalize border-b border-[#F0F0F0] cursor-pointer transition-colors ${
                      isSelected
                        ? 'font-bold text-[#262626]'
                        : 'text-[#767676] hover:text-[#262626]'
                    }`}
                  >
                    <span>{cat.name.replace('-', ' ')}</span>
                    <span className="text-[13px] text-[#A5A5A5]">({cat.count})</span>
                  </li>
                )
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Shop by Color */}
        <AccordionItem value="color" className="border-b border-[#F0F0F0] py-2">
          <AccordionTrigger className="font-bold text-[20px] text-[#262626] font-orebi py-3.5 hover:no-underline cursor-pointer items-center">
            Shop by Color
          </AccordionTrigger>
          <AccordionContent className="font-orebi pt-1 pb-4">
            <ul className="space-y-1">
              <li
                onClick={() => onSelectColor(null)}
                className={`flex items-center justify-between py-2 text-[15px] border-b border-[#F0F0F0] cursor-pointer transition-colors ${
                  selectedColor === null
                    ? 'font-bold text-[#262626]'
                    : 'text-[#767676] hover:text-[#262626]'
                }`}
              >
                <span>All Colors</span>
              </li>
              {colors.map((color) => (
                <li
                  key={color.name}
                  onClick={() => onSelectColor(selectedColor === color.name ? null : color.name)}
                  className={`flex items-center justify-between py-2 text-[15px] border-b border-[#F0F0F0] cursor-pointer transition-colors ${
                    selectedColor === color.name
                      ? 'font-bold text-[#262626]'
                      : 'text-[#767676] hover:text-[#262626]'
                  }`}
                >
                  <div className="flex items-center gap-x-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </div>
                  {selectedColor === color.name && (
                    <span className="text-[12px] text-[#262626] font-bold">Selected</span>
                  )}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Shop by Brand */}
        <AccordionItem value="brand" className="border-b border-[#F0F0F0] py-2">
          <AccordionTrigger className="font-bold text-[20px] text-[#262626] font-orebi py-3.5 hover:no-underline cursor-pointer items-center">
            Shop by Brand
          </AccordionTrigger>
          <AccordionContent className="font-orebi pt-1 pb-4">
            <ul className="space-y-1 max-h-56 overflow-y-auto pr-1">
              <li
                onClick={() => onSelectBrand('All')}
                className={`flex items-center justify-between py-2 text-[15px] border-b border-[#F0F0F0] cursor-pointer transition-colors ${
                  selectedBrand === 'All'
                    ? 'font-bold text-[#262626]'
                    : 'text-[#767676] hover:text-[#262626]'
                }`}
              >
                <span>All Brands</span>
              </li>
              {brands.map((brand) => (
                <li
                  key={brand.name}
                  onClick={() => onSelectBrand(brand.name)}
                  className={`flex items-center justify-between py-2 text-[15px] border-b border-[#F0F0F0] cursor-pointer transition-colors ${
                    selectedBrand === brand.name
                      ? 'font-bold text-[#262626]'
                      : 'text-[#767676] hover:text-[#262626]'
                  }`}
                >
                  <span className="truncate pr-2">{brand.name}</span>
                  <span className="text-[13px] text-[#A5A5A5]">({brand.count})</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* Shop by Price */}
        <AccordionItem value="price" className="border-b border-[#F0F0F0] py-2">
          <AccordionTrigger className="font-bold text-[20px] text-[#262626] font-orebi py-3.5 hover:no-underline cursor-pointer items-center">
            Shop by Price
          </AccordionTrigger>
          <AccordionContent className="font-orebi pt-1 pb-4">
            <ul className="space-y-1">
              <li
                onClick={() => onSelectPriceRange(null)}
                className={`flex items-center justify-between py-2 text-[15px] border-b border-[#F0F0F0] cursor-pointer transition-colors ${
                  selectedPriceIndex === null
                    ? 'font-bold text-[#262626]'
                    : 'text-[#767676] hover:text-[#262626]'
                }`}
              >
                <span>All Prices</span>
              </li>
              {priceRanges.map((range, index) => (
                <li
                  key={range.label}
                  onClick={() => onSelectPriceRange(selectedPriceIndex === index ? null : index)}
                  className={`flex items-center justify-between py-2 text-[15px] border-b border-[#F0F0F0] cursor-pointer transition-colors ${
                    selectedPriceIndex === index
                      ? 'font-bold text-[#262626]'
                      : 'text-[#767676] hover:text-[#262626]'
                  }`}
                >
                  <span>{range.label}</span>
                  {selectedPriceIndex === index && (
                    <span className="text-[12px] text-[#262626] font-bold">Selected</span>
                  )}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default ShopSidebar

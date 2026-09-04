import React from 'react'
import { BsGridFill, BsListUl } from 'react-icons/bs'

const ShopToolbar = ({
  viewMode = 'grid',
  onViewModeChange,
  sortBy = 'featured',
  onSortChange,
  itemsPerPage = 12,
  onItemsPerPageChange,
  totalResults = 0,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-10 font-orebi">
      {/* View Mode Buttons */}
      <div className="flex items-center gap-x-3">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`w-9 h-9 flex items-center justify-center cursor-pointer transition-colors border ${
            viewMode === 'grid'
              ? 'bg-[#262626] text-white border-[#262626]'
              : 'bg-white text-[#767676] border-[#F0F0F0] hover:text-[#262626]'
          }`}
          aria-label="Grid View"
          title="Grid View"
        >
          <BsGridFill className="text-[15px]" />
        </button>

        <button
          onClick={() => onViewModeChange('list')}
          className={`w-9 h-9 flex items-center justify-center cursor-pointer transition-colors border ${
            viewMode === 'list'
              ? 'bg-[#262626] text-white border-[#262626]'
              : 'bg-white text-[#767676] border-[#F0F0F0] hover:text-[#262626]'
          }`}
          aria-label="List View"
          title="List View"
        >
          <BsListUl className="text-[17px]" />
        </button>

        <span className="text-[14px] text-[#767676] ml-2 hidden sm:inline-block">
          Showing {totalResults} product{totalResults === 1 ? '' : 's'}
        </span>
      </div>

      {/* Sort & Show Controls */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-8">
        {/* Sort by */}
        <div className="flex items-center gap-x-3">
          <label htmlFor="sort-select" className="text-[15px] text-[#767676] whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="border border-[#F0F0F0] px-4 py-2 text-[14px] text-[#767676] bg-white outline-none cursor-pointer font-orebi min-w-40"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>

        {/* Show items per page */}
        <div className="flex items-center gap-x-3">
          <label htmlFor="show-select" className="text-[15px] text-[#767676] whitespace-nowrap">
            Show:
          </label>
          <select
            id="show-select"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-[#F0F0F0] px-4 py-2 text-[14px] text-[#767676] bg-white outline-none cursor-pointer font-orebi min-w-20"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ShopToolbar

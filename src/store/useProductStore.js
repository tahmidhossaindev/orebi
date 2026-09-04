import { create } from 'zustand'

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  selectedProduct: null,
  isLoadingDetail: false,

  fetchProducts: async (force = false) => {
    if (!force && get().products.length > 0) {
      return
    }

    set({ isLoading: true, error: null })
    try {
      const response = await fetch('https://dummyjson.com/products?limit=100')
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`)
      }
      const data = await response.json()
      set({ products: data.products || [], isLoading: false })
    } catch (err) {
      set({ error: err.message || 'An error occurred while fetching products', isLoading: false })
    }
  },

  fetchProductById: async (id) => {
    const existing = get().products.find((p) => String(p.id) === String(id))
    if (existing) {
      set({ selectedProduct: existing })
    } else {
      set({ isLoadingDetail: true })
    }

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`)
      }
      const data = await response.json()
      set({ selectedProduct: data, isLoadingDetail: false })
    } catch (err) {
      if (!existing) {
        set({ error: err.message, isLoadingDetail: false })
      }
    }
  },

  addReviewToProduct: (review) => {
    const current = get().selectedProduct
    if (current) {
      const updatedReviews = [review, ...(current.reviews || [])]
      set({
        selectedProduct: {
          ...current,
          reviews: updatedReviews,
        },
      })
    }
  },
}))

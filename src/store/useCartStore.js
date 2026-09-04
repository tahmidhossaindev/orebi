import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        const currentCart = get().cart
        const productId = product.id
        const existingItemIndex = currentCart.findIndex((item) => item.id === productId)

        const rawPrice = typeof product.price === 'string'
          ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0
          : Number(product.price) || 0

        const normalizedProduct = {
          id: productId,
          title: product.title || product.productName || 'Product',
          price: rawPrice,
          thumbnail: product.thumbnail || product.productImage || product.images?.[0] || '',
          category: product.category || product.productCategory || '',
        }

        if (existingItemIndex > -1) {
          const updatedCart = [...currentCart]
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + quantity,
          }
          set({ cart: updatedCart })
        } else {
          set({
            cart: [...currentCart, { ...normalizedProduct, quantity: Math.max(1, quantity) }],
          })
        }
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        })
      },

      updateQuantity: (id, quantity) => {
        const newQty = parseInt(quantity, 10)
        if (isNaN(newQty) || newQty <= 0) {
          get().removeFromCart(id)
          return
        }
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: newQty } : item
          ),
        })
      },

      clearCart: () => {
        set({ cart: [] })
      },

      getTotalCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'orebi-cart-storage',
    }
  )
)

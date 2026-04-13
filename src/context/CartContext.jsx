import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const getCartKey = (item) => `${item.name}::${item.selectedSize ?? 'default'}`

  const addToCart = (item, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => getCartKey(i) === getCartKey(item)
      )
      if (existingItem) {
        return prevItems.map((i) =>
          getCartKey(i) === getCartKey(item)
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prevItems, { ...item, quantity }]
    })
  }

  const removeFromCart = (itemName, selectedSize = 'default') => {
    setCartItems((prevItems) =>
      prevItems.filter((i) => getCartKey(i) !== `${itemName}::${selectedSize}`)
    )
  }

  const updateQuantity = (itemName, selectedSize = 'default', quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemName, selectedSize)
    } else {
      setCartItems((prevItems) =>
        prevItems.map((i) =>
          getCartKey(i) === `${itemName}::${selectedSize}` ? { ...i, quantity } : i
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('Ksh ', ''))
      return total + price * item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

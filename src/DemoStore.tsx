import { useMemo, useSyncExternalStore } from 'react'
import { storeManager } from './StoreManager'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

export function DemoStore() {
  const state = useSyncExternalStore(
    (l) => storeManager.subscribe(l),
    () => storeManager.getState()
  )

  const {
    selectedBrand,
    selectedGender,
    selectedCategory,
    cart,
    isCartOpen,
    showCheckout
  } = state

  const shoes = storeManager.getItems()
  const brands = storeManager.getBrands()
  const genders = storeManager.getGenders()
  const categories = storeManager.getCategories()

  // Filter shoes
  // Note: user said sorting can be in React, but filtering is currently in store.
  // We can also compute filtered shoes here if preferred.
  const filteredShoes = useMemo(() => {
    return shoes.filter(shoe => {
      const brandMatch = selectedBrand === 'ALL' || shoe.brand === selectedBrand
      const genderMatch = selectedGender === 'ALL' || shoe.gender === selectedGender
      const categoryMatch = selectedCategory === 'ALL' || shoe.category === selectedCategory
      return brandMatch && genderMatch && categoryMatch && shoe.is_in_inventory
    })
  }, [shoes, selectedBrand, selectedGender, selectedCategory])

  const totalPrice = storeManager.getTotalPrice()
  const totalItems = storeManager.getTotalItems()

  return (
    <div className="app">
      {/* Header */}
      <motion.header 
        className="header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <motion.h1 
            className="logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            👟 ShoeMart
          </motion.h1>
          <motion.button 
            className="cart-button" 
            onClick={() => storeManager.setCartOpen(!isCartOpen)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🛒 Cart ({totalItems})
          </motion.button>
        </div>
      </motion.header>

      {/* Filters */}
      <motion.div 
        className="filters"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="filter-group">
          <label>Brand:</label>
          <select value={selectedBrand} onChange={e => storeManager.setSelectedBrand(e.target.value)}>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Gender:</label>
          <select value={selectedGender} onChange={e => storeManager.setSelectedGender(e.target.value)}>
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select value={selectedCategory} onChange={e => storeManager.setSelectedCategory(e.target.value)}>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <motion.button
          className="reset-button"
          onClick={() => storeManager.resetFilters()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Filters
        </motion.button>
      </motion.div>

      {/* Products Grid */}
      <main className="products">
        <motion.div 
          className="products-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Available Shoes ({filteredShoes.length})</h2>
        </motion.div>
        <motion.div 
          className="products-grid"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.02,
                delayChildren: 0.6
              }
            }
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredShoes.map((shoe) => (
              <motion.div 
                key={shoe.id} 
                className="product-card"
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                layout
              >
                <div className="product-image">
                  <motion.img 
                    src={shoe.imageURL} 
                    alt={shoe.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  {shoe.featured === 1 && (
                    <motion.span 
                      className="badge"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    >
                      Featured
                    </motion.span>
                  )}
                </div>
                <div className="product-info">
                  <h3>{shoe.name}</h3>
                  <p className="product-meta">
                    {shoe.brand} • {shoe.gender} • {shoe.category}
                  </p>
                  <div className="product-footer">
                    <span className="price">${shoe.price}</span>
                    <motion.button
                      className="add-button"
                      onClick={() => storeManager.addToCart(shoe.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                  <p className="stock">Only {shoe.items_left} left!</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            className="cart-overlay" 
            onClick={() => storeManager.setCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="cart-sidebar" 
              onClick={e => e.stopPropagation()}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="cart-header">
                <h2>Shopping Cart</h2>
                <motion.button 
                  className="close-button" 
                  onClick={() => storeManager.setCartOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>

              {cart.length === 0 ? (
                <motion.div 
                  className="empty-cart"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p>Your cart is empty</p>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    className="cart-items"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      {cart.map(item => (
                        <motion.div 
                          key={item.id} 
                          className="cart-item"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                          layout
                        >
                          <img src={item.imageURL} alt={item.name} />
                          <div className="cart-item-info">
                            <h4>{item.name}</h4>
                            <p className="cart-item-price">${item.price}</p>
                            <div className="quantity-controls">
                              <motion.button 
                                onClick={() => storeManager.updateQuantity(item.id, item.quantity - 1)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                −
                              </motion.button>
                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500 }}
                              >
                                {item.quantity}
                              </motion.span>
                              <motion.button 
                                onClick={() => storeManager.updateQuantity(item.id, item.quantity + 1)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                +
                              </motion.button>
                            </div>
                          </div>
                          <motion.button
                            className="remove-button"
                            onClick={() => storeManager.removeFromCart(item.id)}
                            whileHover={{ scale: 1.1, rotate: 15 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            🗑️
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div 
                    className="cart-footer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="cart-total">
                      <span>Total:</span>
                      <motion.span 
                        className="total-price"
                        key={totalPrice}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        ${totalPrice.toFixed(2)}
                      </motion.span>
                    </div>
                    <motion.button 
                      className="buy-button" 
                      onClick={() => storeManager.handleBuy()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy Now
                    </motion.button>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="modal"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <motion.div 
                className="success-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                ✓
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Purchase Successful!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Thank you for your order.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

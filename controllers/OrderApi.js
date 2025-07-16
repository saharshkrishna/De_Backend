// Add to Cart User
exports.addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();
    res.status(201).json({ cartItem });
  } catch (err) {
    res.status(500).json({ error: "Add to cart failed", details: err.message });
  }
};
// Get Cart Items
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user._id });
    res.status(200).json({ cartItems });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart items", details: err.message });
  }
};
// Remove from Cart
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    await Cart.deleteOne({ _id: itemId, userId: req.user._id });
    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item from cart", details: err.message });
  }
};
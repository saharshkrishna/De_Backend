// Create Orders
exports.createOrder = async (req, res) => {
    try {
        const { orderId, quantity, address } = req.body;
        if (!orderId || !quantity || !address) {
        return res.status(400).json({ error: "All fields are required" });
        }
    
        const newOrder = new Order({
        orderId,
        quantity,
        address,
        userId: req.user._id // Assuming user is authenticated and user ID is available
        });
    
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (err) {
        res.status(500).json({ error: "Failed to place order", details: err.message });
    }
    }
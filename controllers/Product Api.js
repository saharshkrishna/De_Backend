//Create Product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, size } = req.body;
        if (!name || !description || !price || !category || !size) {
        return res.status(400).json({ error: "All fields are required" });
        }
    
        const newProduct = new Product({
        name,
        description,
        price,
        category,
        size,
        createdBy: req.user._id // Assuming user is authenticated and user ID is available
        });
    
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (err) {
        res.status(500).json({ error: "Failed to create product", details: err.message });
    }
};
//Offers
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ offers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch offers", details: err.message });
  }
};

// Create a new offer
exports.createOffer = async (req, res) => {
  try {
    const { title, description, discount } = req.body;
    if (!title || !description || !discount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newOffer = new Offer({
      title,
      description,
      discount,
      createdBy: req.user._id // Assuming user is authenticated and user ID is available
    });

    await newOffer.save();
    res.status(201).json({ message: "Offer created successfully", offer: newOffer });
  } catch (err) {
    res.status(500).json({ error: "Failed to create offer", details: err.message });
  }
};

// Delete an offer

exports.deleteOffer = async (req, res) => {
    try {
        const { offerId } = req.params;
        const offer = await Offer.findById(offerId);
        if (!offer) {
            return res.status(404).json({ error: "Offer not found" });
        }
        await Offer.deleteOne({ _id : offerId });
        res.status(200).json({ message: "Offer deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete offer", details: err.message });
    }
};

// Update an offer
exports.updateOffer = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { title, description, discount } = req.body;

    const offer = await Offer .findById(offerId);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }
    if (title) offer.title = title;
    if (description) offer.description = description;
    if (discount) offer.discount = discount;
    await offer.save();
    res.status(200).json({ message: "Offer updated successfully", offer });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update offer", details: err.message });
    }
};



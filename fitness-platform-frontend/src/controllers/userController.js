const User = require("../models/User");
const Class = require("../models/Class");

// Fetch class recommendations
exports.getClassRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    // Example recommendation logic
    const recommendations = await Class.find({
      specialization: user.preferences,
    });

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
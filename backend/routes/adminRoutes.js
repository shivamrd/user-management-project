const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();
const User = require("../models/User");

// Get all users (admin only)
// router.get("/users", protect, adminOnly, async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json({ users });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch users", error: error.message });
//   }
// });


router.get("/users", protect, adminOnly, async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = 5; // users per page
    const search = req.query.search || "";

    const query = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { rollno: { $regex: search, $options: "i" } }
      ]
    };

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Delete user by ID (admin only)
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Add User
router.post('/', async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({ message: 'Name and age are required' });
    }

    const isUserExist = await User.findOne({ name });
    if (isUserExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, age });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get Users
router.get('/', async (req, res) => {
  try {
    const { name, sort, page = 1, limit = 10 } = req.query;

    // Search
    let query = {};
    if (name) {
      query.name = new RegExp(name, 'i'); // 'i' for case insensitive
    }

    // Sorting
    let sortOption = {};
    if (sort) {
      sortOption.age = sort === 'asc' ? 1 : -1;
    }

    // Pagination
    const users = await User.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

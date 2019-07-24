'use strict';

const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../middlewares/authMiddlewares');
const User = require('../models/User.js');

/* GET users listing. */
router.get('/private', isNotLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('recipes');
    res.render('private', user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

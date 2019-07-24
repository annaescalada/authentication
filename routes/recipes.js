'use strict';

const express = require('express');

const { isNotLoggedIn } = require('../middlewares/authMiddlewares.js');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

const router = express.Router();

router.get('/create', isNotLoggedIn, (req, res, next) => {
  res.render('recipes/create');
});

router.post('/create', isNotLoggedIn, async (req, res, next) => {
  const { title, level, cuisine, duration } = req.body;
  try {
    const recipe = await Recipe.create({
      title, level, cuisine, duration
    });
    const recipeId = recipe._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { recipes: recipeId } });
    res.redirect('/users/private');
  } catch (error) {
    next(error);
  }
});

module.exports = router;

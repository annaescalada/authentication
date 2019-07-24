'use strict';

const express = require('express');
const router = express.Router();

const Recipe = require('../models/Recipe');
const User = require('../models/User');

/* GET home page. */
router.post('/recipes', async (req, res, next) => {
  const { title, level, cuisine, duration } = req.body;
  try {
    const recipe = await Recipe.create({
      title, level, cuisine, duration
    });
    const recipeId = recipe._id;
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { recipes: recipeId } });
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

router.post('/recipes/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  await Recipe.findByIdAndDelete(id);
  res.json({ message: 'Recipe deleted' });
});

module.exports = router;

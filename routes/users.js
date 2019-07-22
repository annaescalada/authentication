'use strict';

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/private', (req, res, next) => {
  if (req.session.currentUser) {
    return res.render('private');
  }
  next();
});

module.exports = router;

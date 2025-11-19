const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');
const { readData, writeData } = require('../utils/io');
const {calculateStats } =require('../utils/stats')

// Cache variables
let statsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000; // 30 seconds cache

// Watch for file changes (but only in production, not in test)
if (process.env.NODE_ENV !== 'test') {
// Watch for file changes
fs.watch(DATA_PATH, (eventType) => {
  if (eventType === 'change') {
    console.log('Data file changed, invalidating cache...');
    statsCache = null;
    cacheTimestamp = 0;
  }
});
}

// GET /api/stats
router.get('/', async(req, res, next) => {
  try {
    const now = Date.now();
    
    // Return cached data if it's fresh
    if (statsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return res.json({
        ...statsCache,
        cached: true,
        cacheAge: `${Math.round((now - cacheTimestamp) / 1000)}s`,
        cacheExpiresIn: `${Math.round((CACHE_DURATION - (now - cacheTimestamp)) / 1000)}s`
      });
    }

    // Cache expired or doesn't exist - calculate fresh stats
    const data = await readData(DATA_PATH);
    statsCache = calculateStats(data);
    cacheTimestamp = now;

    res.json({
      ...statsCache,
      cached: false,
      cacheDuration: `${CACHE_DURATION / 1000}s`
    });
    
  } catch (err) {
    next(err);
  }

});

module.exports = router;
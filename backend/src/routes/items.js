const express = require('express');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');
const { readData, writeData } = require('../utils/io');

// GET /api/items with pagination and search
router.get('/', async (req, res, next) => {
  try {
    const data = await readData(DATA_PATH);
    const { q, page = 1, limit = 10, sortBy = 'name', order = 'asc' } = req.query;
    
    let results = data;

    // Search/filter by query
    if (q) {
      results = results.filter(item => 
        item.name.toLowerCase().includes(q.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(q.toLowerCase()))
      );
    }

    // Sorting
    results.sort((a, b) => {
      const aVal = a[sortBy] || '';
      const bVal = b[sortBy] || '';
      
      if (order === 'desc') {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    });

    // Pagination
    const currentPage = parseInt(page);
    const pageSize = parseInt(limit);
    const totalItems = results.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResults = results.slice(startIndex, endIndex);

    res.json({
      items: paginatedResults,
      pagination: {
        currentPage,
        pageSize,
        totalItems,
        totalPages,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id (keep existing)
router.get('/:id', async (req, res, next) => {
  try {
    const data = await readData(DATA_PATH);
    const item = data.find(i => i.id === parseInt(req.params.id));
    if (!item) {
      const err = new Error('Item not found');
      err.status = 404;
      throw err;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items (keep existing)
router.post('/', async (req, res, next) => {
  try {
    const item = req.body;
    const data = await readData(DATA_PATH);
    item.id = Date.now();
    data.push(item);
    await writeData(DATA_PATH, data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
// Utility intentionally unused by routes (candidate should refactor)
function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

// Calculate statistics from items
function calculateStats(items) {
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);
  const categories = [...new Set(items.map(item => item.category).filter(Boolean))];
  
  return {
    totalItems: items.length,
    totalPrice: totalPrice,
    averagePrice: items.length > 0 ? (totalPrice / items.length).toFixed(2) : 0,
    categoriesCount: categories.length,
    categories: categories,
    mostExpensive: items.length > 0 ? 
      items.reduce((max, item) => (item.price > max.price ? item : max), items[0]) : 
      null,
    leastExpensive: items.length > 0 ? 
      items.reduce((min, item) => (item.price < min.price ? item : min), items[0]) : 
      null,
    lastCalculated: new Date().toISOString()
  };
}

module.exports = { mean, calculateStats };
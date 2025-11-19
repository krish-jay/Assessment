import React, { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 2,
    totalItems: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchItems = useCallback(async (signal = null, page = 1, query = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.pageSize,
        ...(query && { q: query })
      });

      const options = signal ? { signal } : {};
      const res = await fetch(`http://localhost:3001/api/items?${params}`, options);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      setItems(data.items);
      setPagination(data.pagination);
      setSearchQuery(query);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fetch items error:', error);
        throw error;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const searchItems = useCallback((query, signal = null) => {
    return fetchItems(signal, 1, query); // Reset to page 1 when searching
  }, [fetchItems]);

  const goToPage = useCallback((page, signal = null) => {
    return fetchItems(signal, page, searchQuery);
  }, [fetchItems, searchQuery]);

  return (
    <DataContext.Provider value={{ 
      items, 
      fetchItems, 
      searchItems,
      goToPage,
      loading, 
      pagination,
      searchQuery
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
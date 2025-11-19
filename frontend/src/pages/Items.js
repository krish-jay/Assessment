import React, { useEffect, useState } from 'react';
import { useData } from '../state/DataContext';
import VirtuosoItemsList from '../components/VirtuosoItemsList';
import { SkeletonSearch } from '../components/SkeletonLoader';

function Items() {
  const { 
    items, 
    searchItems, 
    goToPage, 
    loading, 
    pagination,
    searchQuery 
  } = useData();
  
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const loadItems = async () => {
      try {
        await searchItems('', abortController.signal);
        setIsInitialLoad(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch items:', error);
          setIsInitialLoad(false);
        }
      }
    };

    loadItems();

    return () => {
      abortController.abort();
    };
  }, [searchItems]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    const abortController = new AbortController();
    await searchItems(localSearch, abortController.signal);
  };

  const handlePageChange = (page) => {
    const abortController = new AbortController();
    goToPage(page, abortController.signal);
  };

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setHasSearched(false);
    const abortController = new AbortController();
    searchItems('', abortController.signal);
  };

  // Calculate responsive height
  const getListHeight = () => {
    return Math.min(600, window.innerHeight - 280);
  };

  // Safe items array
  const safeItems = Array.isArray(items) ? items : [];

  // Show full page loading state
  if (isInitialLoad) {
    return (
      <div style={{ 
        padding: '20px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <SkeletonSearch />
        <div style={{ 
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#fafafa'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <h2 style={{ 
            margin: '0 0 8px 0',
            fontSize: '20px',
            color: '#333',
            fontWeight: '600'
          }}>
            Loading Items
          </h2>
          <p style={{ 
            margin: 0,
            color: '#666',
            fontSize: '14px'
          }}>
            Please wait while we load your items...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ 
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e1e5e9'
      }}>
        <h1 style={{ 
          margin: '0 0 8px 0',
          fontSize: '28px',
          color: '#1a1a1a',
          fontWeight: '700'
        }}>
          Items Catalog
        </h1>
        <p style={{ 
          margin: 0,
          color: '#666',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          Browse and search through our collection of items
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ 
        marginBottom: '24px',
        padding: '20px',
        backgroundColor: 'white',
        border: '1px solid #e1e5e9',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <form 
          onSubmit={handleSearch} 
          style={{ 
            display: 'flex', 
            gap: '80px', 
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
            <input
              type="text"
              placeholder="Search by item name or category..."
              value={localSearch}
              onChange={handleSearchChange}
              style={{ 
                padding: '12px 16px 12px 44px', 
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                backgroundColor: '#f9fafb',
                transition: 'all 0.2s ease-in-out'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007bff';
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.boxShadow = 'none';
              }}
              aria-label="Search items"
            />
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }}>
              🔍
            </div>
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#9ca3af' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease-in-out',
              minWidth: '120px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#0056b3';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#007bff';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Searching...
              </div>
            ) : (
              'Search'
            )}
          </button>
          
          {(searchQuery || localSearch) && (
            <button 
              type="button" 
              onClick={handleClearSearch}
              disabled={loading}
              style={{ 
                padding: '12px 20px',
                backgroundColor: loading ? '#9ca3af' : '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Results Info */}
      <div style={{ 
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          {searchQuery && (
            <p style={{ 
              margin: '0 0 8px 0', 
              fontSize: '16px',
              color: '#374151',
              fontWeight: '500'
            }}>
              🔍 Showing results for "<strong style={{ color: '#1f2937' }}>{searchQuery}</strong>"
            </p>
          )}
          <p style={{ 
            margin: 0, 
            color: '#6b7280', 
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span>📄 Page <strong>{pagination?.currentPage || 1}</strong> of <strong>{pagination?.totalPages || 1}</strong></span>
            <span>•</span>
            <span>📋 <strong>{safeItems.length}</strong> items</span>
            {pagination?.totalItems && (
              <>
                <span>•</span>
                <span>of <strong>{pagination.totalItems.toLocaleString()}</strong> total</span>
              </>
            )}
          </p>
        </div>

        {/* Results count badge */}
        {hasSearched && (
          <div style={{
            padding: '6px 12px',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {safeItems.length} result{safeItems.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Virtualized Items List */}
      <VirtuosoItemsList 
        items={safeItems}
        height={getListHeight()}
        loading={loading && !isInitialLoad}
      />

      {/* Pagination Controls */}
      {(pagination?.totalPages || 0) > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '32px',
          padding: '24px 0',
          borderTop: '1px solid #e1e5e9'
        }}>
          <button
            onClick={() => handlePageChange((pagination?.currentPage || 1) - 1)}
            disabled={!pagination?.hasPrev || loading}
            style={{
              padding: '12px 20px',
              backgroundColor: (pagination?.hasPrev && !loading) ? '#007bff' : '#f3f4f6',
              color: (pagination?.hasPrev && !loading) ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px',
              cursor: (pagination?.hasPrev && !loading) ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease-in-out',
              minWidth: '100px'
            }}
          >
            ← Previous
          </button>
          
          <div style={{ 
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ 
              fontSize: '14px', 
              color: '#6b7280',
              fontWeight: '500'
            }}>
              Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
            </span>
            
            {(pagination?.totalPages || 0) > 1 && (
              <select 
                value={pagination?.currentPage || 1}
                onChange={(e) => handlePageChange(parseInt(e.target.value))}
                disabled={loading}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {Array.from({ length: pagination?.totalPages || 1 }, (_, i) => i + 1).map(page => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <button
            onClick={() => handlePageChange((pagination?.currentPage || 1) + 1)}
            disabled={!pagination?.hasNext || loading}
            style={{
              padding: '12px 20px',
              backgroundColor: (pagination?.hasNext && !loading) ? '#007bff' : '#f3f4f6',
              color: (pagination?.hasNext && !loading) ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px',
              cursor: (pagination?.hasNext && !loading) ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease-in-out',
              minWidth: '100px'
            }}
          >
            Next →
          </button>
        </div>
      )}

      {/* Empty state for no results after search */}
      {hasSearched && safeItems.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 40px',
          color: '#666',
          border: '2px dashed #e0e0e0',
          borderRadius: '12px',
          backgroundColor: '#fafafa',
          marginTop: '20px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ 
            margin: '0 0 12px 0',
            fontSize: '20px',
            color: '#333',
            fontWeight: '600'
          }}>
            No items found
          </h3>
          <p style={{ 
            margin: '0 0 24px 0',
            fontSize: '16px',
            color: '#666',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.5'
          }}>
            We couldn't find any items matching "<strong>{searchQuery}</strong>".
          </p>
          <button 
            onClick={handleClearSearch}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            View All Items
          </button>
        </div>
      )}
    </div>
  );
}

export default Items;
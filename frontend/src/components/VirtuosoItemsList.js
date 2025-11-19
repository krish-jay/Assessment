import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Link } from 'react-router-dom';
import { SkeletonItem } from './SkeletonLoader';

function VirtuosoItemsList({ items = [], height = 400, loading = false }) {
  const safeItems = Array.isArray(items) ? items : [];

  if (safeItems.length === 0 && !loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 40px',
        color: '#666',
        border: '2px dashed #e0e0e0',
        borderRadius: '12px',
        backgroundColor: '#fafafa',
        margin: '20px 0'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
        <h3 style={{ 
          margin: '0 0 8px 0',
          fontSize: '18px',
          color: '#333',
          fontWeight: '600'
        }}>
          No items found
        </h3>
        <p style={{ 
          margin: 0,
          fontSize: '14px',
          color: '#666'
        }}>
          Try adjusting your search criteria or check back later.
        </p>
      </div>
    );
  }

  const ItemRow = (index) => {
    if (loading) {
      return <SkeletonItem />;
    }

    const item = safeItems[index];
    
    if (!item) {
      return (
        <div style={{ 
          padding: '15px',
          color: '#666',
          fontStyle: 'italic',
          textAlign: 'center'
        }}>
          Loading...
        </div>
      );
    }

    return (
      <div style={{ 
        padding: '8px 12px'
      }}>
        <div 
          style={{ 
            border: '1px solid #e1e5e9', 
            padding: '16px 20px',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            borderLeft: '4px solid #007bff'
          }}
          className="item-card"
        >
          <Link 
            to={'/items/' + item.id} 
            style={{ 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'block'
            }}
            aria-label={`View details for ${item.name}, category: ${item.category}, price: $${item.price}`}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 8px 0',
                  fontSize: '17px',
                  color: '#1a1a1a',
                  fontWeight: '600',
                  lineHeight: '1.4'
                }}>
                  {item.name || 'Unnamed Item'}
                </h3>
                <div style={{ 
                  display: 'flex', 
                  gap: '16px',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#555',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ 
                      padding: '2px 8px',
                      backgroundColor: '#e8f4fd',
                      color: '#0066cc',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {item.category || 'Uncategorized'}
                    </span>
                  </span>
                </div>
              </div>
              <div style={{ 
                textAlign: 'right',
                minWidth: '80px'
              }}>
                <div style={{ 
                  fontSize: '18px', 
                  color: '#2e7d32',
                  fontWeight: '700',
                  marginBottom: '4px'
                }}>
                  ${item.price ? item.price.toLocaleString() : '0'}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#666',
                  fontWeight: '500'
                }}>
                  ID: {item.id}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      border: '1px solid #e1e5e9',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#f8f9fa'
    }}>
      <Virtuoso
        style={{ 
          height: height,
          scrollbarWidth: 'thin',
          scrollbarColor: '#c1c1c1 transparent'
        }}
        totalCount={loading ? 6 : safeItems.length}
        itemContent={ItemRow}
        overscan={200}
      />
    </div>
  );
}

export default VirtuosoItemsList;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/api/items/' + id);
        
        if (!response.ok) {
          throw new Error(`Item not found (Status: ${response.status})`);
        }
        
        const itemData = await response.json();
        setItem(itemData);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch item:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleViewAllItems = () => {
    navigate('/');
  };

  // Loading State
  if (loading) {
    return (
      <div style={{ 
        padding: '40px 24px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
          fontSize: '24px',
          color: '#333',
          fontWeight: '600'
        }}>
          Loading Item Details
        </h2>
        <p style={{ 
          margin: '0',
          fontSize: '16px',
          color: '#666'
        }}>
          Please wait while we fetch the item information...
        </p>
      </div>
    );
  }

  // Error State
  if (error || !item) {
    return (
      <div style={{ 
        padding: '40px 24px',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          fontSize: '80px', 
          marginBottom: '24px',
          lineHeight: '1'
        }}>
          ❌
        </div>
        <h2 style={{ 
          margin: '0 0 12px 0',
          fontSize: '28px',
          color: '#333',
          fontWeight: '700'
        }}>
          Item Not Found
        </h2>
        <p style={{ 
          margin: '0 0 24px 0',
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.5',
          maxWidth: '400px'
        }}>
          {error || "The item you're looking for doesn't exist or has been removed."}
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleBack}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#007bff',
              border: '1px solid #007bff',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#007bff';
            }}
          >
            ← Go Back
          </button>
          <button
            onClick={handleViewAllItems}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0056b3';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            View All Items
          </button>
        </div>
      </div>
    );
  }

  // Success State - Item Found
  return (
    <div style={{ 
      padding: '24px',
      maxWidth: '900px',
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      {/* Back Navigation */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={handleBack}
          style={{
            padding: '10px 20px',
            backgroundColor: 'transparent',
            color: '#007bff',
            border: '1px solid #007bff',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease-in-out'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateX(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#007bff';
            e.target.style.transform = 'translateX(0)';
          }}
        >
          <span>←</span>
          Back to Previous
        </button>
      </div>

      {/* Main Item Card */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e1e5e9',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
      }} className="detail-card">
        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '2px solid #f3f4f6',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h1 style={{ 
              margin: '0 0 12px 0',
              fontSize: 'clamp(24px, 4vw, 36px)',
              color: '#1a1a1a',
              fontWeight: '700',
              lineHeight: '1.2',
              background: 'linear-gradient(135deg, #1a1a1a, #007bff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {item.name}
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <span style={{ 
                padding: '8px 16px',
                backgroundColor: '#e8f4fd',
                color: '#0066cc',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                border: '1px solid #b3d9ff'
              }}>
                🏷️ {item.category}
              </span>
              <span style={{ 
                padding: '6px 12px',
                backgroundColor: '#f8f9fa',
                color: '#6b7280',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                fontFamily: 'monospace'
              }}>
                ID: {item.id}
              </span>
            </div>
          </div>
          
          {/* Price Section */}
          <div style={{ 
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f0f9ff',
            borderRadius: '12px',
            border: '2px solid #e0f2fe',
            minWidth: '140px'
          }}>
            <div style={{ 
              fontSize: 'clamp(24px, 3vw, 32px)', 
              color: '#2e7d32',
              fontWeight: '800',
              marginBottom: '4px',
              lineHeight: '1'
            }}>
              ${item.price ? item.price.toLocaleString() : '0'}
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#0284c7',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Price
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Item Information Card */}
          <div style={{
            padding: '24px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            borderLeft: '4px solid #007bff',
            transition: 'transform 0.2s ease-in-out'
          }} className="detail-card">
            <h3 style={{ 
              margin: '0 0 16px 0',
              fontSize: '18px',
              color: '#1a1a1a',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📋</span>
              Item Information
            </h3>
            <div style={{ 
              fontSize: '15px', 
              color: '#4b5563', 
              lineHeight: '1.6'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <span style={{ fontWeight: '600' }}>Category:</span>
                <span style={{ color: '#007bff', fontWeight: '500' }}>{item.category}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <span style={{ fontWeight: '600' }}>Item ID:</span>
                <span style={{ fontFamily: 'monospace', color: '#6b7280' }}>#{item.id}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '8px 0'
              }}>
                <span style={{ fontWeight: '600' }}>Status:</span>
                <span style={{ 
                  color: '#059669', 
                  fontWeight: '600',
                  backgroundColor: '#d1fae5',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}>
                  ● Active
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Details Card */}
          <div style={{
            padding: '24px',
            backgroundColor: '#f0f9ff',
            borderRadius: '12px',
            borderLeft: '4px solid #0ea5e9',
            transition: 'transform 0.2s ease-in-out'
          }} className="detail-card">
            <h3 style={{ 
              margin: '0 0 16px 0',
              fontSize: '18px',
              color: '#1a1a1a',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>💰</span>
              Pricing Details
            </h3>
            <div style={{ 
              fontSize: '15px', 
              color: '#4b5563', 
              lineHeight: '1.6'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #e0f2fe'
              }}>
                <span style={{ fontWeight: '600' }}>Base Price:</span>
                <span style={{ color: '#2e7d32', fontWeight: '600' }}>${item.price}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #e0f2fe'
              }}>
                <span style={{ fontWeight: '600' }}>Currency:</span>
                <span style={{ color: '#6b7280' }}>USD ($)</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                padding: '8px 0'
              }}>
                <span style={{ fontWeight: '600' }}>Format:</span>
                <span style={{ color: '#6b7280' }}>Standard Pricing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div style={{
          padding: '20px',
          backgroundColor: '#fef7ff',
          borderRadius: '12px',
          borderLeft: '4px solid #8b5cf6',
          marginBottom: '32px'
        }}>
          <h3 style={{ 
            margin: '0 0 12px 0',
            fontSize: '16px',
            color: '#1a1a1a',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>ℹ️</span>
            About This Item
          </h3>
          <p style={{ 
            margin: '0',
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.5'
          }}>
            This item is part of our catalog and is available for viewing. 
            For more information about this product, please contact support.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end',
          paddingTop: '24px',
          borderTop: '1px solid #f3f4f6',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleBack}
            style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#6b7280';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#6b7280';
            }}
          >
            ← Back
          </button>
          <button
            onClick={handleViewAllItems}
            style={{
              padding: '12px 28px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '600',
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0056b3';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Browse All Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
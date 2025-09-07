import { NextRequest, NextResponse } from 'next/server';
import { frames } from 'frames.js/next';
import { Button } from 'frames.js/next';

const handleRequest = frames(async (ctx) => {
  const { message, pressedButton } = ctx;

  // Initial frame - show welcome message
  if (!message) {
    return {
      image: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f8fafc',
            fontFamily: 'Inter, sans-serif',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#4f46e5',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
              }}
            >
              <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>L</span>
            </div>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#4f46e5', margin: 0 }}>
              Legalo
            </h1>
          </div>
          <p style={{ fontSize: '24px', color: '#64748b', textAlign: 'center', margin: 0 }}>
            Your Pocket Rights Navigator
          </p>
          <p style={{ fontSize: '18px', color: '#64748b', textAlign: 'center', marginTop: '16px' }}>
            Get instant access to legal rights information and dispute resolution templates
          </p>
        </div>
      ),
      buttons: [
        <Button action="post" target="/api/frames/browse">
          Browse Rights
        </Button>,
        <Button action="post" target="/api/frames/search">
          Search
        </Button>,
        <Button action="post" target="/api/frames/templates">
          Templates
        </Button>,
      ],
    };
  }

  // Handle different button presses
  switch (pressedButton?.index) {
    case 1: // Browse Rights
      return {
        image: (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              backgroundColor: '#f8fafc',
              padding: '40px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>
              Browse by Category
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  🏠 Tenant Rights
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', margin: '8px 0 0 0' }}>
                  Rent, deposits, evictions, and housing issues
                </p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  👥 Workplace Rights
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', margin: '8px 0 0 0' }}>
                  Employment, wages, discrimination, and safety
                </p>
              </div>
            </div>
          </div>
        ),
        buttons: [
          <Button action="post" target="/api/frames/category/tenant">
            Tenant Rights
          </Button>,
          <Button action="post" target="/api/frames/category/workplace">
            Workplace
          </Button>,
          <Button action="post" target="/api/frames">
            Back
          </Button>,
        ],
      };

    case 2: // Search
      return {
        image: (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: '#f8fafc',
              padding: '40px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>
              Search Rights Information
            </h2>
            <p style={{ fontSize: '18px', color: '#64748b', textAlign: 'center' }}>
              Use the text input below to search for specific rights topics
            </p>
          </div>
        ),
        textInput: 'Enter your rights question...',
        buttons: [
          <Button action="post" target="/api/frames/search-results">
            Search
          </Button>,
          <Button action="post" target="/api/frames">
            Back
          </Button>,
        ],
      };

    case 3: // Templates
      return {
        image: (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              backgroundColor: '#f8fafc',
              padding: '40px',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>
              Dispute Resolution Templates
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  📄 Demand Letter Template
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', margin: '8px 0 0 0' }}>
                  Professional template for demanding action - 0.01 USDC
                </p>
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  🏠 Tenant Complaint Form
                </h3>
                <p style={{ fontSize: '16px', color: '#64748b', margin: '8px 0 0 0' }}>
                  Formal complaint template for housing issues - 0.01 USDC
                </p>
              </div>
            </div>
          </div>
        ),
        buttons: [
          <Button action="post" target="/api/frames/template/demand-letter">
            Demand Letter
          </Button>,
          <Button action="post" target="/api/frames/template/tenant-complaint">
            Tenant Form
          </Button>,
          <Button action="post" target="/api/frames">
            Back
          </Button>,
        ],
      };

    default:
      return {
        image: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: '#f8fafc',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <p style={{ fontSize: '24px', color: '#64748b' }}>
              Something went wrong. Please try again.
            </p>
          </div>
        ),
        buttons: [
          <Button action="post" target="/api/frames">
            Start Over
          </Button>,
        ],
      };
  }
});

export const GET = handleRequest;
export const POST = handleRequest;

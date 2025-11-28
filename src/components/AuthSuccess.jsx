import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        const token = searchParams.get('token');
        const userData = searchParams.get('user');

        console.log('🔐 OAuth Success - Token:', token ? 'Received' : 'Missing');
        console.log('👤 User Data:', userData ? 'Received' : 'Missing');

        if (!token) {
          setError('Authentication failed: No token received');
          setLoading(false);
          return;
        }

        // Save token to localStorage
        localStorage.setItem('token', token);
        
        // Parse and save user data
        if (userData) {
          const user = JSON.parse(decodeURIComponent(userData));
          localStorage.setItem('user', JSON.stringify(user));
          console.log('✅ User saved:', user.name);
        }

        console.log('✅ Authentication successful! Redirecting...');
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
          navigate('/trendCrypto'); // atau '/trendCrypto' sesuai preference
        }, 2000);

      } catch (err) {
        console.error('❌ OAuth handling error:', err);
        setError('Failed to process authentication');
        setLoading(false);
      }
    };

    handleOAuthSuccess();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>
          🔐 Authentication Successful!
        </div>
        <div style={{ fontSize: '16px', color: '#666' }}>
          Redirecting to dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '20px', color: 'red' }}>
          ❌ Authentication Failed
        </div>
        <div style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
          {error}
        </div>
        <button 
          onClick={() => navigate('/login')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  return null;
};

export default AuthSuccess;
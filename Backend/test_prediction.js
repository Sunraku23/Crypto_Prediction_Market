const axios = require('axios');

async function testPrediction() {
  try {
    // Test without auth first
    console.log('1. Testing AI health...');
    const healthResponse = await axios.get('http://localhost:5000/api/ai/health');
    console.log('✅ AI Health:', healthResponse.data);

    // Test with auth
    console.log('\n2. Testing prediction with auth...');
    
    // First login
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com', // Ganti dengan email user yang ada
      password: '123456'
    });
    
    const token = loginResponse.data.data.token;
    console.log('✅ Login successful');

    // Test prediction
    const predictionResponse = await axios.post('http://localhost:5000/api/ai/predict', {
      coin: 'BTC'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Prediction successful:');
    console.log(JSON.stringify(predictionResponse.data, null, 2));

  } catch (error) {
    console.error('❌ Test failed:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testPrediction();
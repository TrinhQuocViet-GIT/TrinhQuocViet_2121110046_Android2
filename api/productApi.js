const axios = require('axios');
const apiUrl = 'https://localhost:1337';
const token = '19ed8162e3a86caf503e26f9562df49d02a0aa7fcd808898b4ed8e6f18229bbd4733d6614929429c96717e6ec96f73871ee3c8e4f9dbe808d0759df73c875637d0ac6e8afc16dd5a208b31a73c01675a144823c7dd56acb0932382a070d2e9e81fab60b76f51ba3430b35adfda603658b7e3a15334ec5931a388cd2b94f42f36';

axios.get(`${apiUrl}/api/product`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
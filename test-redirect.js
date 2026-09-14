const fetch = require('node-fetch');

async function testRedirect() {
  const originalUrl = "https://selhaya.com/cart/c/hWNDWa3KIzUs92dxXQlZW0uc?key=5447eac721232803b780b66e7bc04d10";
  const testUrl = originalUrl.replace('selhaya.com', 'shop.selhaya.com');
  
  console.log("Fetching:", testUrl);
  
  try {
    const response = await fetch(testUrl, { redirect: 'manual' });
    console.log("Status:", response.status);
    console.log("Location:", response.headers.get('location'));
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testRedirect();

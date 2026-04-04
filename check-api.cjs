fetch('http://localhost:1337/api/news?populate=*')
  .then(r => {
    console.log('Status:', r.status);
    return r.json();
  })
  .then(data => {
    console.log('News items:', data.data?.length || 0);
    if (data.data && data.data.length > 0) {
      console.log('✅ Backend is working with data!');
      data.data.forEach((item, i) => {
        console.log(`  ${i+1}. ${item.attributes.title}`);
      });
    } else {
      console.log('⚠️ No news items found');
    }
  })
  .catch(e => {
    console.log('❌ API Error:', e.message);
  });

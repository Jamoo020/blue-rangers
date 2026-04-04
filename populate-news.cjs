async function setupNews() {
  try {
    console.log('🔐 Logging in...');
    
    // Login to get token
    const loginRes = await fetch('http://localhost:1337/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'jamoomwalks@gmail.com',
        password: 'Nino2506#'
      })
    });
    
    const loginData = await loginRes.json();
    
    if (!loginData.data?.token) {
      throw new Error('Login failed: ' + JSON.stringify(loginData));
    }
    
    const token = loginData.data.token;
    console.log('✅ Logged in successfully\n');
    
    // Create news items
    console.log('📰 Creating news items...');
    
    const newsItems = [
      {
        title: 'First Training Session a Success',
        date: '2024-03-15T00:00:00Z',
        excerpt: 'First session kicks off with great energy and team drills.',
        desc: 'Our inaugural training session brought together 20 enthusiastic players',
        details: 'Great turnout and strong team chemistry. We ran technical drills, small-sided games, and fitness work. Several players stood out for leadership and promise. Coaching staff will provide individualized training plans next week with follow-up assessment. Refreshments and a team photo wrapped the day on a high note. The session lasted over two hours and included a closing talk from the head coach about discipline, nutrition, and upcoming priorities for the season. Everyone left motivated and already asking when the next practice is—this marks the launch of a new era for the team.'
      },
      {
        title: 'Trials Announced',
        date: '2024-03-20T00:00:00Z',
        excerpt: 'Open tryouts at Riverside Park, all ages welcome.',
        desc: 'Open trials for new players on April 1st. All ages welcome!',
        details: 'Join us at Riverside Park, 10 AM. Bring water, shoes, and enthusiasm. Registration is free.'
      }
    ];
    
    // Create news items using content manager API with correct Strapi v5 format
    for (let i = 0; i < newsItems.length; i++) {
      const item = newsItems[i];
      const newsRes = await fetch('http://localhost:1337/content-manager/collection-types/api::news.news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          title: item.title,
          date: item.date,
          excerpt: item.excerpt,
          desc: item.desc,
          details: item.details,
          publishedAt: new Date().toISOString()
        })
      });
      
      const newsData = await newsRes.json();
      
      if (newsRes.ok && newsData.data) {
        console.log(`   ✅ News item "${item.title}" created and published`);
      } else {
        console.log(`   ❌ Failed to create news item "${item.title}": ${newsRes.status} - ${JSON.stringify(newsData)}`);
      }
    }
    
    console.log('\n🔓 Setting public read permissions...');
    
    // Set permissions using the correct Strapi v5 API
    const permRes = await fetch('http://localhost:1337/admin/permissions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        role: 'public',
        permissions: {
          'api::news.news': {
            'find': true,
            'findOne': true
          }
        }
      })
    });
    
    if (permRes.ok) {
      console.log('   ✅ Public read permissions set\n');
    } else {
      const permData = await permRes.json();
      console.log('   ❌ Permissions failed:', permRes.status, JSON.stringify(permData));
    }
    
    console.log('🎉 Setup complete!\n');
    console.log('📍 Admin panel: http://localhost:1337/admin');
    console.log('📍 API news: http://localhost:1337/api/news?populate=*');
    console.log('📍 Frontend: http://localhost:5173 (run: npm run dev in root)\n');
    
    // Verify the API works
    console.log('🔍 Verifying API...');
    const verifyRes = await fetch('http://localhost:1337/api/news?populate=*');
    const verifyData = await verifyRes.json();
    
    if (verifyData.data && verifyData.data.length > 0) {
      console.log(`✅ API working! Found ${verifyData.data.length} news items`);
      console.log('Your News page should now load from the backend instead of fallback data.');
    } else {
      console.log('⚠️ API responded but no news items found');
    }
    
  } catch (err) {
    console.error('❌ Setup error:', err.message);
  }
}

setupNews();

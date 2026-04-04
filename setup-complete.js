const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// Paths
const strapiBackendPath = path.join(__dirname, 'strapi-backend');
const tmpPath = path.join(strapiBackendPath, '.tmp');
const dbPath = path.join(tmpPath, 'data.db');

console.log('🔧 Starting complete setup...\n');

// Step 1: Clean up
console.log('1️⃣  Cleaning up old database...');
if (fs.existsSync(tmpPath)) {
  fs.rmSync(tmpPath, { recursive: true, force: true });
}
console.log('   ✓ Database cleaned\n');

// Step 2: Run Strapi build
console.log('2️⃣  Building Strapi...');
const { execSync } = require('child_process');
try {
  execSync('npm run build', { cwd: strapiBackendPath, stdio: 'inherit' });
  console.log('   ✓ Build complete\n');
} catch (e) {
  console.error('   ✗ Build failed:', e.message);
  process.exit(1);
}

// Step 3: Start Strapi and wait for initialization
console.log('3️⃣  Starting Strapi server...');
const strapiProcess = require('child_process').spawn('npm', ['run', 'develop'], { 
  cwd: strapiBackendPath,
  detached: true,
  stdio: 'ignore'
});
strapiProcess.unref();

console.log('   ℹ️  Waiting 90 seconds for Strapi to initialize...');
setTimeout(async () => {
  console.log('   ✓ Strapi started\n');
  
  // Step 4: Initialize admin and create data
  console.log('4️⃣  Initializing admin user and data...');
  
  try {
    // Create admin user via init endpoint
    const adminResponse = await fetch('http://localhost:1337/admin/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: 'Admin',
        lastname: 'User',
        email: 'admin@football.com',
        password: 'Admin12345!@',
        confirmPassword: 'Admin12345!@'
      })
    });
    
    const adminData = await adminResponse.json();
    
    if (!adminData.data?.token) {
      throw new Error('Failed to create admin: ' + JSON.stringify(adminData));
    }
    
    const token = adminData.data.token;
    console.log('   ✓ Admin user created\n');
    
    // Step 5: Create news items
    console.log('5️⃣  Creating news items...');
    
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
    
    for (let i = 0; i < newsItems.length; i++) {
      const item = newsItems[i];
      const newsRes = await fetch('http://localhost:1337/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ data: item })
      });
      
      const newsData = await newsRes.json();
      
      if (newsRes.ok && newsData.data) {
        const id = newsData.data.id;
        
        // Publish the news item
        const publishRes = await fetch(`http://localhost:1337/api/news/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            data: {
              ...item,
              publishedAt: new Date().toISOString()
            }
          })
        });
        
        if (publishRes.ok) {
          console.log(`   ✓ News item ${i + 1} created and published`);
        } else {
          console.log(`   ⚠️  News item ${i + 1} created but publish failed`);
        }
      } else {
        console.log(`   ✗ Failed to create news item ${i + 1}: ${JSON.stringify(newsData)}`);
      }
    }
    
    console.log('\n6️⃣  Setting public read permissions...');
    
    // Get user roles to set permissions
    const rolesRes = await fetch('http://localhost:1337/admin/roles?params[_limit]=-1', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const rolesData = await rolesRes.json();
    const publicRole = rolesData.data?.find(r => r.type === 'public');
    
    if (publicRole) {
      const permRes = await fetch(`http://localhost:1337${publicRole.routes.setPermissions}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          permissions: [
            { action: 'api::news.news.find', enabled: true },
            { action: 'api::news.news.findOne', enabled: true }
          ]
        })
      });
      
      if (permRes.ok) {
        console.log('   ✓ Public read permissions set\n');
      } else {
        console.log('   ⚠️  Permissions may need manual configuration\n');
      }
    }
    
    console.log('✅ Setup complete!\n');
    console.log('📍 Admin panel: http://localhost:1337/admin');
    console.log('📍 API news: http://localhost:1337/api/news?populate=*');
    console.log('📍 Frontend: http://localhost:5173 (run: npm run dev in root)\n');
    console.log('Email: admin@football.com');
    console.log('Password: Admin12345!@\n');
    
  } catch (err) {
    console.error('❌ Setup error:', err.message);
    process.exit(1);
  }
}, 90000);

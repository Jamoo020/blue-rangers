# Kill any running node processes
taskkill /f /im node.exe 2>$null

# Remove old database
if (Test-Path "c:\Users\USER\OneDrive\Desktop\Football club\strapi-backend\.tmp") {
    Remove-Item -Recurse -Force "c:\Users\USER\OneDrive\Desktop\Football club\strapi-backend\.tmp"
}

# Go to strapi backend
cd "c:\Users\USER\OneDrive\Desktop\Football club\strapi-backend"

# Build
Write-Host "Building Strapi..."
npm run build

# Start Strapi in background
Write-Host "Starting Strapi..."
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "develop"

# Wait for strapi to load
Write-Host "Waiting for Strapi to initialize (60 seconds)..."
Start-Sleep -Seconds 60

# Create admin user and news items
Write-Host "Creating admin user and news..."
node -e @"
const http = require('http');

async function setup() {
  try {
    // Create admin user
    const adminRes = await fetch('http://localhost:1337/admin/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: 'Admin',
        lastname: 'User',
        email: 'admin@example.com',
        password: 'Admin123!@#',
        confirmPassword: 'Admin123!@#'
      })
    });
    
    const adminData = await adminRes.json();
    console.log('Admin created:', adminData);

    // If successful, get auth token
    if (adminData.data && adminData.data.token) {
      const token = adminData.data.token;
      
      // Create news items
      const newsItems = [
        {
          title: 'First Training Session a Success',
          date: '2024-03-15',
          excerpt: 'First session kicks off with great energy and team drills.',
          desc: 'Our inaugural training session brought together 20 enthusiastic players',
          details: 'Great turnout and strong team chemistry. We ran technical drills, small-sided games, and fitness work. Several players stood out for leadership and promise. Coaching staff will provide individualized training plans next week with follow-up assessment. Refreshments and a team photo wrapped the day on a high note. The session lasted over two hours and included a closing talk from the head coach about discipline, nutrition, and upcoming priorities for the season. Everyone left motivated and already asking when the next practice is—this marks the launch of a new era for the team.',
          publishedAt: new Date().toISOString()
        },
        {
          title: 'Trials Announced',
          date: '2024-03-20',
          excerpt: 'Open tryouts at Riverside Park, all ages welcome.',
          desc: 'Open trials for new players on April 1st. All ages welcome!',
          details: 'Join us at Riverside Park, 10 AM. Bring water, shoes, and enthusiasm. Registration is free.',
          publishedAt: new Date().toISOString()
        }
      ];
      
      for (const item of newsItems) {
        const newsRes = await fetch('http://localhost:1337/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ data: item })
        });
        const newsData = await newsRes.json();
        console.log('News created:', newsData);
      }
      
      // Set public permissions
      const permRes = await fetch('http://localhost:1337/admin/permissions/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          role: 'public',
          action: 'api::news.news.find'
        })
      });
      console.log('Permissions set:', permRes.status);
    }
  } catch (err) {
    console.error('Setup error:', err.message);
  }
}

setup();
"@

Write-Host "Setup complete! Strapi should now be running at http://localhost:1337"

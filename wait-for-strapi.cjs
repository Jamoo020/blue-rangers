const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function check() {
  console.log('Waiting for Strapi server (checking every 5 seconds)...\n');
  
  for (let i = 0; i < 24; i++) {
    try {
      const r = await fetch('http://localhost:1337/api/news-items?populate=*');
      if (r.ok) {
        const data = await r.json();
        console.log('✅ Strapi is running!\n');
        console.log('News items count:', data.data?.length || 0);
        if (data.data && data.data.length > 0) {
          console.log('\n📰 News items:');
          data.data.forEach((item, i) => {
            console.log(`  ${i+1}. ${item.attributes.title}`);
          });
        } else {
          console.log('(No news items yet)');
        }
        return;
      }
    } catch (e) {
      process.stdout.write('.');
    }
    await sleep(5000);
  }
  
  console.log('\n❌ Strapi did not respond after 2 minutes');
}

check();

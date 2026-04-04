fetch('https://jolly-basket-d3988dc7c8.strapiapp.com/api/news?populate=*')
  .then(res => {
    console.log('status', res.status);
    return res.text();
  })
  .then(text => console.log('body', text.slice(0, 500)))
  .catch(err => console.error('error', err.message));

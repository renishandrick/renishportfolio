const https = require('https');

https.get('https://api.github.com/repos/mrdoob/three.js/contents/examples/textures/planets', {
  headers: { 'User-Agent': 'Node.js' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const names = json.map(f => f.name);
      console.log('Available textures:', names.join(', '));
    } catch(e) {
      console.log('Error parsing JSON:', data);
    }
  });
}).on('error', console.error);

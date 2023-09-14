const { exec } = require('child_process');

const baseURLs = [
    'http://ff.harness-demo.site/diegopereiraeng',
    'http://ff.harness-demo.site/qa'
  ];
  
  const pagesToBeTested = [
    { name: 'login', url: '/index.html' },
    { name: 'home', url: '/home_new.html' }
  ];
  
const DATA_POINTS = {
  PERFORMANCE: 'performance',
  ACCESSIBILITY: 'accessibility',
  BEST_PRACTICES: 'best-practices',
  SEO: 'seo',
};

baseURLs.forEach(baseURL => {
    pagesToBeTested.forEach(page => {
        const fullURL = baseURL + page.url;
        exec(`lighthouse ${fullURL} --output json`, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error: ${stderr}`);
                return;
            }
    
            const jsonOutput = JSON.parse(stdout);
            const scores = {
                url,
                [DATA_POINTS.PERFORMANCE]: jsonOutput.categories.performance.score * 100,
                [DATA_POINTS.ACCESSIBILITY]: jsonOutput.categories.accessibility.score * 100,
                [DATA_POINTS.BEST_PRACTICES]: jsonOutput.categories['best-practices'].score * 100,
                [DATA_POINTS.SEO]: jsonOutput.categories.seo.score * 100
            };
            
            console.log(scores);

             // Storing the categories object as a string in an environment variable
            process.env[`CATEGORIES_${page.name.toUpperCase()}`] = JSON.stringify(jsonOutput.categories);

            // Now you can access this environment variable elsewhere in your script like this:
            const categories = JSON.parse(process.env[`CATEGORIES_${page.name.toUpperCase()}`]);
            console.log(`Categories for ${page.name}:`, categories);
        });
    }); 
});

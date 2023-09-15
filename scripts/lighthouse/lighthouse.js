const puppeteer = require('puppeteer');
const { exec } = require('child_process');

const environments = {
  Dev: 'http://ff.harness-demo.site/diegopereiraeng',
  QA: 'http://ff.harness-demo.site/qa'
};

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

async function runLighthouse() {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    const browserURL = browser.wsEndpoint();
    const browserPort = browserURL.split(':')[2].split('/')[0];

    console.log(`Browser running at ${browserURL}`);
    console.log(`Browser port is ${browserPort}`);

    baseURLs.forEach(baseURL => {
        pagesToBeTested.forEach(page => {
        const fullURL = `${baseURL}${page.url}?env=${process.argv[2]}`;
        exec(`lighthouse ${fullURL} --output json --port=${browserPort}`, (err, stdout, stderr) => {
            if (err) {
            console.error(`Error: ${stderr}`);
            return;
            }

            const jsonOutput = JSON.parse(stdout);
            const scores = {
            url: fullURL,
            [DATA_POINTS.PERFORMANCE]: jsonOutput.categories.performance.score * 100,
            [DATA_POINTS.ACCESSIBILITY]: jsonOutput.categories.accessibility.score * 100,
            [DATA_POINTS.BEST_PRACTICES]: jsonOutput.categories['best-practices'].score * 100,
            [DATA_POINTS.SEO]: jsonOutput.categories.seo.score * 100,
            };

            console.log(scores);

            process.env[`CATEGORIES_${page.name.toUpperCase()}`] = JSON.stringify(jsonOutput.categories);
            const categories = JSON.parse(process.env[`CATEGORIES_${page.name.toUpperCase()}`]);
            console.log(`Categories for ${page.name}:`, categories);
        });
        });
    });

    await browser.close();
}


function startTesting(env) {
  const baseURL = environments[env];
  if (baseURL) {
    pagesToBeTested.forEach(page => {
      const fullURL = baseURL + page.url;
      runLighthouse(fullURL, page.name);
    });
  } else {
    console.error('Invalid environment specified.');
  }
}

// Get the environment parameter from the command line arguments
const envParam = process.argv[2];
startTesting(envParam);

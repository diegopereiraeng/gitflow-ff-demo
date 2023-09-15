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

async function runLighthouse(url, pageName) {
  const browser = await puppeteer.launch();
  const browserURL = browser.wsEndpoint();
  const port = browserURL.split(':')[2].split('/')[0];

  exec(`lighthouse ${url} --port=${port} --output json`, (err, stdout, stderr) => {
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
    process.env[`CATEGORIES_${pageName.toUpperCase()}`] = JSON.stringify(jsonOutput.categories);

    // Now you can access this environment variable elsewhere in your script like this:
    const categories = JSON.parse(process.env[`CATEGORIES_${pageName.toUpperCase()}`]);
    console.log(`Categories for ${pageName}:`, categories);
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

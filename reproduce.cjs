const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('response', async response => {
    const status = response.status();
    const url = response.url();
    // Only log our API calls
    if (url.includes('/api/')) {
      console.log(`[NETWORK] ${response.request().method()} ${url} -> ${status}`);
      if (status >= 400) {
        try {
          const body = await response.text();
          console.log(`[NETWORK ERROR BODY] ${body}`);
        } catch(e) {}
      }
    }
  });

  page.on('console', msg => {
    if (msg.text().includes('SESSION_EXPIRED') || msg.text().includes('AUTH') || msg.text().includes('Error')) {
      console.log(`[CONSOLE] ${msg.text()}`);
    }
  });

  try {
    console.log('Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    console.log('Clicking Sign In...');
    await page.click('button:has-text("Sign In")');

    // Wait for email input to be visible (Auth screen)
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    
    console.log('Logging in...');
    await page.fill('input[type="email"]', 'anchitlahkar0202@gmail.com');
    await page.fill('input[type="password"]', '12341234');
    await page.click('button:has-text("[ Sign In ]")');

    // Wait for dashboard to load by waiting for a specific dashboard element or API call
    console.log('Waiting for Dashboard...');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    console.log('Dashboard loaded.');

    await page.waitForTimeout(2000);

    // Navigate to Planet Twin
    console.log('Navigating to Planet Twin...');
    await page.click('a[href="/twin"]');
    await page.waitForTimeout(2000);

    const isVisible = await page.isVisible('text=TERRA Advisor');
    if (!isVisible) {
      console.log('TERRA Advisor NOT VISIBLE! Page probably crashed or sidebar is gone.');
      console.log(await page.content());
    }

    // Check if Session Expired overlay is visible
    let sessionExpired = await page.isVisible('text=Session Expired');
    console.log('Is Session Expired visible after Twin?', sessionExpired);
    if (sessionExpired) return;

    // Navigate to AI Coach
    console.log('Navigating to AI Coach...');
    await page.click('text=TERRA Advisor');
    await page.waitForTimeout(2000);

    sessionExpired = await page.isVisible('text=Session Expired');
    console.log('Is Session Expired visible after Coach?', sessionExpired);
    if (sessionExpired) return;

    // Navigate to Optimization Center
    console.log('Navigating to Optimization Center...');
    await page.click('text=Optimization');
    await page.waitForTimeout(2000);

    sessionExpired = await page.isVisible('text=Session Expired');
    console.log('Is Session Expired visible after Optimization?', sessionExpired);

    // Optional: look for the error message in the DOM
    const bodyText = await page.content();
    if (bodyText.includes('Session Expired')) {
        console.log('Session Expired text found in DOM!');
    }

  } catch(e) {
    console.error('Test script error:', e);
  } finally {
    await browser.close();
  }
})();
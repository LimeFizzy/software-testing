import { test, expect } from '@playwright/test';
import {
  navigateToHome,
  navigateToSection,
  registerUser,
  generateTestUserData,
} from './utils';
import { APP_CONFIG, ECOM_SELECTORS, URL_PATTERNS } from './constants/selectors';

test('Lecture Demo: With Masking', async ({ page }) => {
  await navigateToHome(page, APP_CONFIG.ECOM_BASE_URL, ECOM_SELECTORS.HEADER.LOGO);
  await navigateToSection(page, ECOM_SELECTORS.NAV.REGISTER, URL_PATTERNS.REGISTER);

  const testData = generateTestUserData();
  await registerUser(page, testData);
  await navigateToHome(page, APP_CONFIG.ECOM_BASE_URL, ECOM_SELECTORS.HEADER.LOGO);

  await expect(page).toHaveScreenshot({
    fullPage: true,
    mask: [page.locator(ECOM_SELECTORS.HEADER.ACCOUNT)],
  });
});

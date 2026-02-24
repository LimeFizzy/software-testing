import { test, expect } from '@playwright/test';
import { navigateToHome, navigateToSection } from './utils';
import { APP_CONFIG, DEMOQA_SELECTORS, URL_PATTERNS } from './constants/selectors';

test('DEMOQA_2.1: Progress Bar - Synchronization', async ({ page }) => {
  await navigateToHome(page, APP_CONFIG.DEMOQA_BASE_URL, DEMOQA_SELECTORS.HEADER.LOGO);
  await navigateToSection(page, DEMOQA_SELECTORS.TABS.WIDGETS, URL_PATTERNS.WIDGETS);
  await navigateToSection(page, DEMOQA_SELECTORS.WIDGETS.PROGRESS_BAR, URL_PATTERNS.PROGRESS_BAR);

  const progressBar = page.locator(DEMOQA_SELECTORS.PROGRESS_BAR.PROGRESS_BAR);
  const startStopButton = page.locator(DEMOQA_SELECTORS.PROGRESS_BAR.START_STOP_BUTTON);
  const resetButton = page.locator(DEMOQA_SELECTORS.PROGRESS_BAR.RESET_BUTTON);

  await startStopButton.click();

  await expect(progressBar).toHaveAttribute('aria-valuenow', '100', { timeout: 15000 });
  
  await expect(resetButton).toBeVisible();
});

test('DEMOQA_2.2: Dynamic Properties', async ({ page }) => {
  await navigateToHome(page, APP_CONFIG.DEMOQA_BASE_URL, DEMOQA_SELECTORS.HEADER.LOGO);
  await navigateToSection(page, DEMOQA_SELECTORS.TABS.ELEMENTS, URL_PATTERNS.ELEMENTS);
  await navigateToSection(
    page,
    DEMOQA_SELECTORS.ELEMENTS.DYNAMIC_PROPERTIES,
    URL_PATTERNS.DYNAMIC_PROPERTIES
  );

  const enableAfterButton = page.locator(DEMOQA_SELECTORS.DYNAMIC_PROPERTIES.ENABLE_AFTER_BUTTON);
  const visibleAfterElement = page.locator(
    DEMOQA_SELECTORS.DYNAMIC_PROPERTIES.VISIBLE_AFTER_ELEMENT
  );

  await expect(enableAfterButton).toBeEnabled({ timeout: 6000 });

  await expect(visibleAfterElement).toBeVisible({ timeout: 6000 });
});

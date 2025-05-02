// BasePage.js - Base class for all Page Objects
import { expect } from '@playwright/test';

export class BasePage {
  /**
   * Base constructor for all pages
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.baseURL = 'https://stage-astrocrm.obrio.net';
  }

  /**
   * Navigate to a specific URL
   * @param {string} path - Path for navigation relative to baseURL
   */
  async navigateTo(path) {
    await this.page.goto(`${this.baseURL}${path}`);
  }

  /**
   * Wait for element to be visible
   * @param {import('@playwright/test').Locator} locator - Element locator
   * @param {number} timeout - Timeout in milliseconds (optional)
   */
  async waitForVisible(locator, timeout) {
    await expect(locator).toBeVisible({ timeout: timeout || 15000 });
  }

  /**
   * Fill a text field
   * @param {import('@playwright/test').Locator} locator - Field locator
   * @param {string} value - Value to input
   */
  async fillField(locator, value) {
    await this.waitForVisible(locator);
    await locator.fill(value);
  }

  /**
   * Click on an element with waiting for its visibility
   * @param {import('@playwright/test').Locator} locator - Element locator to click
   */
  async clickElement(locator) {
    await this.waitForVisible(locator);
    await locator.click();
  }

  /**
   * Wait for URL to change
   * @param {string} urlPattern - URL pattern to wait for
   * @param {number} timeout - Timeout in milliseconds (optional)
   */
  async waitForUrl(urlPattern, timeout) {
    await this.page.waitForURL(urlPattern, { timeout: timeout || 30000 });
  }

  /**
   * Wait for page to load (based on network state)
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify element is visible
   * @param {import('@playwright/test').Locator} locator - Element locator
   */
  async verifyElementVisible(locator) {
    await expect(locator).toBeVisible();
  }

  /**
   * Verify element text
   * @param {import('@playwright/test').Locator} locator - Element locator
   * @param {string} expectedText - Expected text
   */
  async verifyElementText(locator, expectedText) {
    await this.waitForVisible(locator);
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Scroll to element
   * @param {import('@playwright/test').Locator} locator - Element locator
   */
  async scrollToElement(locator) {
    await this.waitForVisible(locator);
    await locator.scrollIntoViewIfNeeded();
  }
}
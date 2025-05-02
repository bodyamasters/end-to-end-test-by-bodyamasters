import { BasePage } from './BasePage';

export class ChatPage extends BasePage {
  /**
   * Class for interacting with the application's chat page
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    this.firstChat = page.locator("main[class='css-14p4q9j'] a").first();
    this.chatUpperBlock = page.locator(".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.css-1lsnlgw");
    this.chatMainBlock = page.locator(".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.css-1p72xcz");
    this.scriptsBlock = page.locator(".MuiBox-root.css-osyylf");
  }

  /**
   * Method to open the first chat from the list
   */
  async openFirstChat() {
    await this.clickElement(this.firstChat);
    // Verify that chat opened successfully
    await this.verifyElementVisible(this.chatUpperBlock);
    await this.verifyElementVisible(this.chatMainBlock);
    await this.verifyElementVisible(this.scriptsBlock);
  }

  /**
   * Checks if a script group with the given name is visible
   * @param {string} groupName - Name of the script group
   */
  async verifyScriptGroupVisible(groupName) {
    const scriptButton = this.scriptsBlock.locator(`button:has-text("${groupName}")`).last();
    await this.scrollToElement(scriptButton);
    await this.verifyElementVisible(scriptButton);
    await this.verifyElementText(scriptButton, groupName);
  }
}
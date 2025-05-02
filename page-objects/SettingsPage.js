import { testData } from '../fixtures/test-data';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class SettingsPage extends BasePage {
  /**
   * Class for interacting with the application's settings page
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    this.addGroupButton = page.locator('[data-testid="AddIcon"]');
    this.groupItem = page.locator(`li:has-text("${testData.groupName} (1)")`);
    this.newGroupItem = page.locator('li:has-text("New group")').last();
    this.saveButton = page.locator("button[type='submit']");
    this.groupTitleInput = page.locator('input[name="title"]');
    this.scriptInput = page.locator("textarea[placeholder='Start typing ...']");
    this.moreOptionsButton = this.groupItem.locator('button:has(svg[data-testid="MoreHorizIcon"])');
    this.deleteButton = page.getByRole('menuitem', { name: 'Delete' });
    this.deleteButtonDialog = page.getByRole('button', { name: 'Delete' });
    this.moreSettingsButton = page.locator('button:has(svg[data-testid="KeyboardArrowDownIcon"])');
    this.settingsButton = page.locator("a li[role='menuitem']");
  }

  /**
   * Method to navigate to the settings page
   */
  async navigateToSettings() {
    await this.clickElement(this.moreSettingsButton);
    await this.clickElement(this.settingsButton);
    await this.waitForUrl('**/quick-messages');
  }

  /**
   * Method to create a new script group
   */
  async createNewGroup() {
    await this.clickElement(this.addGroupButton);
    await this.clickElement(this.newGroupItem);
    
    // Check save button state
    await this.verifyElementVisible(this.saveButton);
    await expect(this.saveButton).toBeDisabled();
    
    // Fill in group fields
    await this.fillField(this.groupTitleInput, testData.groupName);
    await expect(this.groupTitleInput).toHaveValue(testData.groupName);
    
    await this.fillField(this.scriptInput, testData.scriptText);
    await expect(this.scriptInput).toHaveValue(testData.scriptText);
    
    // Verify the button is enabled and save the group
    await expect(this.saveButton).toBeEnabled();
    await this.clickElement(this.saveButton);
  }

  /**
   * Method to delete a script group
   */
  async deleteGroup() {
    await this.verifyElementVisible(this.groupItem);
    await this.clickElement(this.moreOptionsButton);
    await this.clickElement(this.deleteButton);
  }

  /**
   * Method to confirm deletion of a script group
   */
  async confirmDelete() {
    await this.clickElement(this.deleteButtonDialog);
  }
}
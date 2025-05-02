import { testData } from '../fixtures/test-data';
import { expect } from '@playwright/test';


export class SettingsPage {
  // This class contains methods to interact with the settings page of the application
    constructor(page) {
      this.page = page;
      this.addGroupButton = page.locator('[data-testid="AddIcon"]');
      this.groupItem = page.locator(`li:has-text("${testData.groupName} (1)")`);
      this.newGroupItem = page.locator('li:has-text("New group")').last();
      this.saveButton = page.locator("button[type='submit']");
      this.groupTitleInput = page.locator('input[name="title"]');
      this.scriptInput = page.locator("textarea[placeholder='Start typing ...']");
      this.moreOptionsButton = this.groupItem.locator('button:has(svg[data-testid="MoreHorizIcon"])');
      this.deleteButton = page.getByRole('menuitem', { name: 'Delete' });
      this.deleteButtonDialog = page.getByRole('button', { name: 'Delete' });;


    }
  // Method to navigate to the settings page
    async navigateToSettings() {
        const moreSettingsButton = this.page.locator('button:has(svg[data-testid="KeyboardArrowDownIcon"])');
        await expect(moreSettingsButton).toBeVisible();
        await moreSettingsButton.click();
    
        const settingsButton = this.page.locator("a li[role='menuitem']");
        await expect(settingsButton).toBeVisible();
        await settingsButton.click();
    
        await this.page.waitForURL('**/quick-messages');
      }

    // Method to create a new script group
    async createNewGroup() {
        await expect(this.addGroupButton).toBeVisible();
        await this.addGroupButton.click();
    
        await expect(this.newGroupItem).toBeVisible();
        await this.newGroupItem.click();
    
        await expect(this.saveButton).toBeVisible();
        await expect(this.saveButton).toBeDisabled();
    
        await this.groupTitleInput.fill(testData.groupName);
        await expect(this.groupTitleInput).toHaveValue(testData.groupName);
    
        await this.scriptInput.fill(testData.scriptText);
        await expect(this.scriptInput).toHaveValue(testData.scriptText);
    
        await expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();
    
      }
      // Method to delete the script group
    async deleteGroup() {
        await expect(this.groupItem).toBeVisible();
    
        await expect(this.moreOptionsButton).toBeVisible();
        await this.moreOptionsButton.click();
    
        await expect(this.deleteButton).toBeVisible();
        await this.deleteButton.click();
      }

      // Method to confirm the deletion of the script group
    async confirmDelete() {
      await expect(this.deleteButtonDialog).toBeVisible();
      await this.deleteButtonDialog.click();
      }

  }
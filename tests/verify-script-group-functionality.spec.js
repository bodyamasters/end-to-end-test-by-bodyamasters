import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { validUser } from '../fixtures/login-data';
import { SettingsPage } from '../page-objects/SettingsPage';
import { ChatPage } from '../page-objects/ChatPage';
import { testData } from '../fixtures/test-data';

test.afterEach(async ({ page }, testInfo) => {
   // Cleanup the created group after each test

   // Check if the test failed
   // and attach a screenshot if it did
    if (testInfo.status !== 'passed') {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
      }

    try {
        // Navigate to the settings page
        let settingsPage = new SettingsPage(page);
        await settingsPage.navigateToSettings(page);
        await expect(page.url().endsWith('/quick-messages')).toBeTruthy();

        // Delete the created group
        await settingsPage.deleteGroup(page);

        // Wait for the delete confirmation dialog to appear
        const deleteScriptDialog = page.locator("section[role='dialog']");
        await expect(deleteScriptDialog).toBeVisible();

        // Confirm the deletion
        await settingsPage.confirmDelete(page);
    } catch (error) {
        // If an error occurs during cleanup, log it and attach a screenshot
        console.warn('❌ afterEach cleanup failed:', error.message);
        await testInfo.attach('cleanup-error', { 
            body: await page.screenshot(), 
            contentType: 'image/png' 
          });
    }
});

test('Verify Script Group Functionality', async ({ page }) => {
    //Create a new instances for the page objects
    let settingsPage = new SettingsPage(page);
    let chatPage = new ChatPage(page);
    let loginPage = new LoginPage(page);
    
    // Navigate to the login page
    await loginPage.goto();
    await loginPage.login(validUser.email, validUser.password);

    // Wait for the login to complete and the URL to change
    await page.waitForURL('**/chat');
    await expect(page.url().endsWith('/chat')).toBeTruthy();

    // Open the settings page
    await settingsPage.navigateToSettings();
    await expect(page.url().endsWith('/quick-messages')).toBeTruthy();

    // Verify the page title
    const scriptGroupsTitle = page.locator(".MuiTypography-root.MuiTypography-body1.css-eidqfs");
    await expect(scriptGroupsTitle).toHaveText('Script Groups');
    await expect(scriptGroupsTitle).toBeVisible();

    // Create a new script group
    await settingsPage.createNewGroup();

    // Verify the new group creation
    const successAlert = page.locator("section[role='alert']");
    await expect(successAlert).toBeVisible();

    // Navigate to the sidebar menu
    const sideMenuButton = page.locator('button.MuiButton-containedPrimary[type="button"] svg.MuiSvgIcon-root');
    await sideMenuButton.click();

    // Navigate to the /chats page
    const sideMenuChatsButton = page.locator("a.MuiListItemButton-root[href='/chat']");
    await sideMenuChatsButton.click();

    // Wait for the page to load and verify the URL
    await page.waitForURL('**/chat');
    await expect(page.url().endsWith('/chat')).toBeTruthy();

    // Open the first chat
    chatPage.openFirstChat();

    // Wait for the opned chat blocks to be visible
    const chatUpperBlock = page.locator(".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.css-1lsnlgw");
    await expect(chatUpperBlock).toBeVisible();

    const chatMainBlock = page.locator(".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.css-1p72xcz");
    await expect(chatMainBlock).toBeVisible();

    const scriptsBlock = page.locator(".MuiBox-root.css-osyylf");
    await expect(scriptsBlock).toBeVisible();

    // Verify the script group button is visible
    const newAddedScriptButton = scriptsBlock.locator(`button:has-text("${testData.groupName}")`).last();
    await newAddedScriptButton.scrollIntoViewIfNeeded();
    await expect(newAddedScriptButton).toBeVisible();
    await expect(newAddedScriptButton).toHaveText(testData.groupName);
});
import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { validUser } from '../fixtures/login-data';
import { SettingsPage } from '../page-objects/SettingsPage';
import { ChatPage } from '../page-objects/ChatPage';
import { testData } from '../fixtures/test-data';

/**
 * Fixture to clean up the created group after each test
 */
test.afterAll(async ({ page }, testInfo) => {
   // Check if the test failed and add a screenshot
    if (testInfo.status !== 'passed') {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }

    try {
        // Navigate to the settings page
        let settingsPage = new SettingsPage(page);
        await settingsPage.navigateToSettings();
        
        // Delete the created group
        await settingsPage.deleteGroup();

        // Wait for the delete confirmation dialog to appear
        const deleteScriptDialog = page.locator("section[role='dialog']");
        await expect(deleteScriptDialog).toBeVisible();

        // Confirm the deletion
        await settingsPage.confirmDelete();
    } catch (error) {
        // Log the error and attach a screenshot when cleanup fails
        console.warn('❌ afterEach cleanup failed:', error.message);
        await testInfo.attach('cleanup-error', { 
            body: await page.screenshot(), 
            contentType: 'image/png' 
        });
    }
});

/**
 * Test script group functionality
 */
test('Verify Script Group Functionality', async ({ page }) => {
    // Create instances of page objects
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);
    const chatPage = new ChatPage(page);
    
    // Login to the system
    await loginPage.goto();
    await loginPage.login(validUser.email, validUser.password);

    // Verify successful login
    await expect(page.url()).toContain('/chat');

    // Open the settings page
    await settingsPage.navigateToSettings();
    
    // Verify page title
    const scriptGroupsTitle = page.locator(".MuiTypography-root.MuiTypography-body1.css-eidqfs");
    await expect(scriptGroupsTitle).toHaveText('Script Groups');
    await expect(scriptGroupsTitle).toBeVisible();

    // Create a new script group
    await settingsPage.createNewGroup();

    // Verify successful group creation
    const successAlert = page.locator("section[role='alert']");
    await expect(successAlert).toBeVisible();

    // Navigate to the sidebar menu
    const sideMenuButton = page.locator('button.MuiButton-containedPrimary[type="button"] svg.MuiSvgIcon-root');
    await sideMenuButton.click();

    // Navigate to the chats page
    const sideMenuChatsButton = page.locator("a.MuiListItemButton-root[href='/chat']");
    await sideMenuChatsButton.click();

    // Wait for the page to load
    await page.waitForURL('**/chat');
    await expect(page.url()).toContain('/chat');

    // Open the first chat
    await chatPage.openFirstChat();

    // Verify the created script group is visible
    await chatPage.verifyScriptGroupVisible(testData.groupName);
});
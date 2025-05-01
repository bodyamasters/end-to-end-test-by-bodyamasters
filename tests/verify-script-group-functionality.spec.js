import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { validUser } from '../fixtures/login-data';
import { SettingsPage } from '../page-objects/SettingsPage';
import { ChatPage } from '../page-objects/ChatPage';
import { testData } from '../fixtures/test-data';

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
      }

    try {
        let settingsPage = new SettingsPage(page);
        await settingsPage.navigateToSettings(page);
        await expect(page.url().endsWith('/quick-messages')).toBeTruthy();


        await settingsPage.deleteGroup(page);

        const deleteScriptDialog = page.locator("section[role='dialog']");
        await expect(deleteScriptDialog).toBeVisible();


        await settingsPage.confirmDelete(page);
    } catch (error) {
        console.warn('❌ afterEach cleanup failed:', error.message);
        await testInfo.attach('cleanup-error', { 
            body: await page.screenshot(), 
            contentType: 'image/png' 
          });
    }
});

test('Verify Script Group Functionality', async ({ page }) => {
    let settingsPage = new SettingsPage(page);
    let chatPage = new ChatPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.email, validUser.password);

    await page.waitForURL('**/chat');
    await expect(page.url().endsWith('/chat')).toBeTruthy();

    await settingsPage.navigateToSettings();
    await expect(page.url().endsWith('/quick-messages')).toBeTruthy();


    const scriptGroupsTitle = page.locator(".MuiTypography-root.MuiTypography-body1.css-eidqfs");
    await expect(scriptGroupsTitle).toHaveText('Script Groups');
    await expect(scriptGroupsTitle).toBeVisible();

    await settingsPage.createNewGroup();

    const successAlert = page.locator("section[role='alert']");
    await expect(successAlert).toBeVisible();


    const sideMenuButton = page.locator('button.MuiButton-containedPrimary[type="button"] svg.MuiSvgIcon-root');
    await sideMenuButton.click();

    const sideMenuChatsButton = page.locator("a.MuiListItemButton-root[href='/chat']");
    await sideMenuChatsButton.click();

    await page.waitForURL('**/chat');
    await expect(page.url().endsWith('/chat')).toBeTruthy();

    chatPage.openFirstChat();

    const chatUpperBlock = page.locator(".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.css-1lsnlgw");
    await expect(chatUpperBlock).toBeVisible();

    const chatMainBlock = page.locator(".MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.css-1p72xcz");
    await expect(chatMainBlock).toBeVisible();

    const scriptsBlock = page.locator(".MuiBox-root.css-osyylf");
    await expect(scriptsBlock).toBeVisible();

    const newAddedScriptButton = scriptsBlock.locator(`button:has-text("${testData.groupName}")`).last();
    await newAddedScriptButton.scrollIntoViewIfNeeded();
    await expect(newAddedScriptButton).toBeVisible();
    await expect(newAddedScriptButton).toHaveText(testData.groupName);
});
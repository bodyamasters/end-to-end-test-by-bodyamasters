// CRM Login
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  /**
   * Constructor to initialize the page and elements
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    this.usernameField = page.getByRole('textbox', { name: 'E-mail' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.locator("//p[@class='MuiFormHelperText-root Mui-error css-80z6o9']");
    this.emailErrorMessage = page.locator("//p[@id=':r0:-helper-text']");
    this.passwordErrorMessage = page.locator("//p[@id=':r1:-helper-text']");
  }
  
  /**
   * Method to navigate to the login page
   */
  async goto() {
    await this.navigateTo('/login');
  }
    
  /**
   * Method to login to the application
   * @param {string} username - User's email
   * @param {string} password - User's password
   */
  async login(username, password) {
    await this.fillField(this.usernameField, username);
    await this.fillField(this.passwordField, password);
    await this.clickElement(this.loginButton);
    // Wait for navigation to complete after login
    await this.waitForUrl('**/chat');
  }
}
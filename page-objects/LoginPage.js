// CRM Login
export class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameField = page.getByRole('textbox', { name: 'E-mail' });
      this.passwordField = page.getByRole('textbox', { name: 'Password' });
      this.loginButton = page.getByRole('button', { name: 'Sign In' });
      this.errorMessage = page.locator("//p[@class='MuiFormHelperText-root Mui-error css-80z6o9']")
      this.emailErrorMessage = page.locator("//p[@id=':r0:-helper-text']");
      this.passwordErrorMessage = page.locator("//p[@id=':r1:-helper-text']");
      
      //*[@id="root"]/div/section/form/p
     // /html/body/div[1]/div/section/form/p
    }
  
    async goto() {
      await this.page.goto('https://stage-astrocrm.obrio.net/login');
    }
  
    async login(username, password) {
      await this.usernameField.fill(username);
      await this.passwordField.fill(password);
      await this.loginButton.click();
    }
  }
  
  //
import { expect } from "@playwright/test";

export class ChatPage {
  // This class contains methods to interact with the chat page of the application  
  constructor(page) {
      this.page = page;
      this.firstChat = page.locator("main[class='css-14p4q9j'] a").first();

    }
    // Method to open the first chat
    async openFirstChat() {
        await expect(this.firstChat).toBeVisible();
        await this.firstChat.click();
    }
}
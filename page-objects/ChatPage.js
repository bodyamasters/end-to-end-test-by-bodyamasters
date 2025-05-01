import { expect } from "@playwright/test";

export class ChatPage {
    constructor(page) {
      this.page = page;
      this.firstChat = page.locator("main[class='css-14p4q9j'] a").first();

    }
    async openFirstChat() {
        await expect(this.firstChat).toBeVisible();
        await this.firstChat.click();
    }
}
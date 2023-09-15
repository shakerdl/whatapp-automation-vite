import React, { useEffect } from 'react';
import { Builder, By, Key, until } from 'selenium-webdriver';
import 'chromedriver';

class WhatsAppBot {
  constructor() {
    // Initialize the driver and open Chrome
    this.driver = new webdriver.Builder().forBrowser("chrome").build();
  }

  async login() {
    try {
      // Open the WhatsApp web website
      await this.driver.get("https://web.whatsapp.com/");
      console.log("Please scan QR Code once");

      // Wait for the user to scan the QR code
      await driver.wait(
        until.elementLocated(
          By.xpath(
            '//label[@class="_2MSJr"]//div[@class="_2S1VP copyable-text selectable-text"]'
          )
        ),
        30000 // Timeout in milliseconds (adjust as needed)
      );

      console.log("Scanning Successful");
      // Further actions after successful scanning can be added here
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      // Close the WebDriver session
      await driver.quit();
    }
  }

  async searchChat(name) {
    // Locate the search input field and enter the chat name
    const searchBox = await this.driver.findElement(By.css("div[_1EUay]"));
    await searchBox.sendKeys(name, Key.RETURN);

    // Wait for a short time to ensure search results load
    await this.driver.sleep(2000);
  }

  async sendMessage(message) {
    // Select the chat box input field
    const chatBox = await this.driver.findElement(By.css('div[data-tab="6"]'));
    debugger;
    // Type the message and send it
    await chatBox.sendKeys(message, Key.RETURN);

    // Wait for a short time to ensure the message is sent
    await this.driver.sleep(1000);
  }

  async quit() {
    // Close the browser
    await this.driver.quit();
  }
}

const chatNames = ["Your Chat Name"];
const messages = ["Your Message"];
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
const minHour = 7; // Minimum hour (7:00 AM)
const maxHour = 23; // Maximum hour (11:00 PM)

const bot = new WhatsAppBot();
bot.login();

(async () => {
  try {
    while (true) {
      const currentDate = new Date();
      const currentDay = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      debugger;
      // Check if it's a valid day (Sunday to Friday)
      if (daysOfWeek.includes(currentDay)) {
        const currentHour = currentDate.getHours();

        // Check if the current hour is within the specified range
        if (currentHour >= minHour && currentHour <= maxHour) {
          const randomMinutes = Math.floor(Math.random() * 60);
          const randomSeconds = Math.floor(Math.random() * 60);
          const timeToSend = `${currentHour}:${randomMinutes}:${randomSeconds}`;

          for (const name of chatNames) {
            await bot.searchChat(name);
            await bot.sendMessage(
              messages[Math.floor(Math.random() * messages.length)]
            );
          }

          console.log(`Message sent at ${timeToSend} on ${currentDay}`);
        }
      }

      // Sleep for an hour before checking the time again
      await bot.driver.sleep(3600000); // 1 hour interval
    }
  } catch (e) {
    console.error("Error:", e);
  } finally {
    bot.quit();
  }
})();

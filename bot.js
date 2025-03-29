import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';

const loadConfig = () => {
  const rawData = fs.readFileSync('./botOptions.json');
  return JSON.parse(rawData);
};

const config = loadConfig();
const groups = config.groups;

const addPosts = async () => {
  const options = new chrome.Options();
  options.addArguments('disable-infobars', '--disable-notifications');
  options.setChromeBinaryPath(process.env.CHROME_BIN);
  if (!config.interfaceVisible) options.addArguments('--headless');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('https://www.facebook.com');
    console.log('Zaloguj się ręcznie. Czekam na zalogowanie...');

    await driver.wait(
      until.elementLocated(By.xpath("//input[@type='search']")),
      0
    );

    console.log('✅ Zalogowano! Kontynuuję...');

    for (let item of groups) {
      await driver.get(item);
      await driver.sleep(5000);

      try {
        let postBox = await driver.wait(
          until.elementLocated(
            By.xpath(
              "//div[@role='button' and .//span[text()='Napisz coś...']]"
            )
          ),
          5000
        );
        await postBox.click();
        await driver.sleep(2000);

        let activeBox = await driver.findElement(
          By.xpath("//div[@aria-label='Napisz coś...']")
        );
        await activeBox.sendKeys(config.postText);

        if (config.imagePath) {
          let addPhotoButton = await driver.wait(
            until.elementLocated(
              By.xpath(
                "//img[contains(@class, 'x1b0d499') and contains(@class, 'xl1xv1r')]"
              )
            ),
            5000
          );
          await addPhotoButton.click();
          await driver.sleep(2000);

          let fileInput = await driver.wait(
            until.elementLocated(
              By.xpath(
                "(//input[@type='file'][contains(@class, 'x1s85apg')])[3]"
              )
            ),
            5000
          );
          await fileInput.sendKeys(config.imagePath);
          await driver.sleep(5000);
        }

        let publishButton = await driver.wait(
          until.elementLocated(
            By.xpath("//div[@role='button' and .//span[text()='Opublikuj']]")
          ),
          5000
        );
        await publishButton.click();
        console.log(`Post został opublikowany w grupie: ${item}`);
      } catch (error) {
        console.log(`Błąd w grupie ${item}:`, error);
      }

      await driver.sleep(2000);
    }
  } catch (e) {
    console.log('Błąd główny:', e);
  } finally {
    if (config.closeOnEnd) await driver.quit();
  }
};

addPosts();
export { addPosts };

const { Builder, By } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const cron = require('node-cron');

cron.schedule('*/1 * * * *', async () => await main());

async function main() {
    let driver;

    try {
        //Browser Setup
        let builder = new Builder().forBrowser('chrome');
        let options = new Options();
        options.headless();                                 // run headless Chrome
        options.excludeSwitches(['enable-logging']);        // disable 'DevTools listening on...'
        options.addArguments(['--no-sandbox']);             // not an advised flag but eliminates "DevToolsActivePort file doesn't exist" error.
        options.addArguments(['--disable-dev-shm-usage']);  // containers seem to have issue with shm. Disabling it - and using disk - seems to be good.
        driver = await builder.setChromeOptions(options).build();

        // Navigate to Google and get the "Google Search" button text.
        await driver.get('https://www.google.com');
        const btnText = await driver.findElement(By.name('btnK')).getAttribute('value');
        log(`Google button text: ${btnText}`);
    } catch (e) {
        log(e);
    } finally {
        if (driver) {
            await driver.close();   // helps chromedriver shut down cleanly and delete the "scoped_dir" temp directories that eventually fill up the harddrive.
            await driver.quit();
        }
    }
}

function getDateTimeStamp() {
    const dateTimeFormat = {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
        hour12: false
    };;

    return new Date().toLocaleString('en-US', dateTimeFormat);
}

function log(msg) {
    console.log(`${getDateTimeStamp()}: ${msg}`);
}
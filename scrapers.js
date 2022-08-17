const puppeteer = require('puppeteer'); //import puppeteer package
/*
puppeteer allows for essentially using a browser within code.
open websites, read data, take screenshots etc. 

CCS selector for Image Column in Rounds table
#mw-content-text > div.mw-parser-output > div.table-wide > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > a > img
*/

    async function scrapeTable(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const rounds = await page.$$eval('tbody > tr', rows => {
        return Array.from(rows, row => {
            const col = row.querySelectorAll('td:not(td:nth-child(1))');
            return Array.from(col, c => c.textContent.trim(). replace(/['"]+/g, ''))
        });
    });

    browser.close();
    return rounds;
}

module.exports = {scrapeTable}



const puppeteer = require('puppeteer');
const fs = require('fs');

var readline = require('readline');

async function getPage() {


  browser = await puppeteer.launch({
    headless: false,
    timeout: 30000 * 10,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })

  page = true
  page = await browser.newPage();
  await page.setContent('<pre></pre>')


  return page
}

var bOn=false
async function main() {
  getPage()
    .then(page => {
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      });

      if(!bOn) {
        bOn=true
      rl.on('line',aaa )
      }

      async function aaa(line) {
        // console.log(line);
        // let page = await getPage()
        let preElement = await page.$('pre')
        let all = await page.evaluate(pre => pre.innerText, preElement)

        all += line
        all += "\n";

        await page.evaluate((pre, all) => {
          pre.innerText = all
        }, preElement, all);
      }
    })


}

main()

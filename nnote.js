const puppeteer = require('puppeteer');
const readline = require('readline');

const DEBUGGING = false
function dtrace(message) {
  if (DEBUGGING) {
    console.log(message)
  }
}
async function getPage() {
  browser = await puppeteer.launch({
    headless: false,
    timeout: 30000 * 10,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })

  page = await browser.newPage();
  await page.setContent(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <pre></pre>
</body>
</html>
  `)

  return [browser, page]
}

async function main() {
  getPage()
    .then(async ([browser, page]) => {

      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
      });

      // rl.on('line', async (line) => {
      //   let preElement = await page.$('pre')

      //   await page.evaluate((pre, line) => {
      //     pre.innerText += (line + "\n")
      //   }, preElement, line);
      // })
      let waits = []
      rl.on('line', (line) => {
        let prom = page.$('pre')
          .then((preElement) => {
            return page.evaluate((pre, line) => {
              pre.innerText += (line + "\n")
            }, preElement, line);
          })
          .catch(err => console.log(err))
        waits.push(prom)
      })
      rl.on('close', () => {
        dtrace('stdin closed')
        Promise.all(waits)
          .then((waits) => {
            dtrace(waits)
            browser.disconnect()
            dtrace('disconnected')
            // Looks like we can not exit without closing chromium
            // browser.close()
            //   .then(() => {
            //     dtrace('closed')
            //     // process.exit(0)
            //   })
            //   .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
    })
    .catch(err => console.log(err))

}

main()

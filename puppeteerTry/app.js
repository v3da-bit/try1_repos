var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();









const { jsPDF } = require("jspdf"); // will automatically load the node version
require('jspdf-autotable')
const doc = new jsPDF();
// const autoTables=new autoTable()

// doc.text("Hello world!", 10, 10);// Y axis matters first
// doc.text("Hello vedant!", 40, 20);// Y axis matters first

// doc.save("a4.pdf"); 
const tableColumns = ["column1", "Column2", "Column3"];

const tableRows = [[1, 2, 3], ["a", "b", "c"], ["X", "Y", "Z"]];
doc.autoTable(tableColumns, tableRows, { startY: 20 });

doc.text("Closed tickets within the last one month.", 14, 15);

// doc.autoTable(doc, { html: '#my-table' })

// // Or use javascript directly:
// autoTable(doc, {
//   head: [['Name', 'Email', 'Country']],
//   body: [
//     ['David', 'david@example.com', 'Sweden'],
//     ['Castille', 'castille@example.com', 'Spain'],
//     // ...
//   ],
// })

// // Sometimes you might have to call the default function on the export (for example in Deno)
// autoTable.default(doc, { html: '#my-table' })

doc.save('table.pdf')

const qs = require('qs');
const data = {
    title: 'GeeksforGeeks',
    category: 'Programming',
    // tags: ['JavaScript', 'Node.js', 'npm'],
    names: [['vedant', 'abc'], ['khamar', 'xyz']]
};
let queryString = qs.stringify(data);
queryString += '&names%5B1%5D%5B0%5D=mon&names%5B1%5D%5B0%5D=tue'
console.log('Serialized Query String:', queryString);
const res = qs.parse(queryString);
console.log('Parsed Data:', res.names);
(async() => {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "vedantkhamar975@gmail.com",
            pass: "xgrnisndugidlkry",
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'vedantkhamar975@gmail.com', // sender address
            to: "bar@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }

    await main().catch(console.error);
    //adding Puppeteer library
    const pt = require('puppeteer');
    pt.launch().then(async browser => {
        //browser new page
        const page = await browser.newPage();
        //set viewpoint of browser page
        await page.setViewport({ width: 1000, height: 500 })
        //launch URL
        await page.goto('https://v3da-bit.github.io/Vedant_Portfolio/')
        await page.waitForNetworkIdle()
        //capture screenshot
        await page.screenshot({
            path: 'browserstack-demo123.png',
            fullPage: true
        });

        await page.setViewport({ width: 1080, height: 1024 });

        // Type into search box.
        await page.locator('.devsite-search-field').fill('automate beyond recorder');

        // Wait and click on first result.
        await page.locator('.devsite-result-item-link').click();

        // Locate the full title with a unique string.
        const textSelector = await page
            .locator('text/Customize and automate')
            .waitHandle();
        const fullTitle = await textSelector?.evaluate(el => el.textContent);

        // Print the full title.
        console.log('The title of this blog post is "%s".', fullTitle);

        //browser close
        await browser.close()
    })
})()


const puppeteer1 = require('puppeteer-extra')

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer1.use(StealthPlugin())

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer1.use(AdblockerPlugin({ blockTrackers: true }))

// That's it, the rest is puppeteer usage as normal 😊
puppeteer1.launch({ headless: true }).then(async browser => {
    const page = await browser.newPage()
    await page.setViewport({ width: 800, height: 600 })

    console.log(`Testing adblocker plugin..`)
    await page.goto('https://www.vanityfair.com')
    //   await page.waitForTimeout(1000)
    await page.screenshot({ path: 'adblocker.png', fullPage: true })

    console.log(`Testing the stealth plugin..`)
    await page.goto('https://bot.sannysoft.com')
    //   await page.waitForTimeout(5000)
    await page.screenshot({ path: 'stealth.png', fullPage: true })

    console.log(`All done, check the screenshots. ✨`)
    await browser.close()
})








app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

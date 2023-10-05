const fs = require('fs');   //to write inside a file
const puppeteer = require('puppeteer');
const data = {
    list : []
}


async function main(skill) {
    //launches chromium
    const browser = await puppeteer.launch({headless:false}) //We want to see the browser getting open and closed
    //open new tab
    const page = await browser.newPage();
    await page.goto(`https://in.indeed.com/jobs?q=${skill}&l=bengaluru%2C%20karnataka`, {
        timeout:0,
        waitUntil:'networkidle0',
    })
    //  Get a screenshot of the page
    // await page.screenshot({ path: 'example.png', fullPage: true });

     //  Get a PDF of the page
    // await page.pdf({ path: 'example.pdf', format: 'A4' });

    const jobData = await page.evaluate(async (data) => {
        const items = document.querySelectorAll('td.resultContent')
        items.forEach((item, index) => {
            // console.log(`scraping data of product: ${index}`)
            const title= item.querySelector('h2.jobTitle>a>span') && item.querySelector('h2.jobTitle>a').innerText
            const link =item.querySelector('h2.jobTitle>a') && item.querySelector('h2.jobTitle>a').href
            let salary= item.querySelector('div.metadata.salary-snippet-container > div') && item.querySelector('div.metadata.salary-snippet-container > div').innerText
            const companyName = item.querySelector('span.companyName') && item.querySelector('span.companyName').innerText
            if(salary===null){
                salary="not defined"
            }
            data.list.push({
                title,
                salary,
                companyName,
                link
            })
        })
        return data;
        }, data);
    

    let response = await jobData;
        //convert from an object to string and making json file and writing data to it
    let json = JSON.stringify(jobData,null,2);
        //to write inside a file
    fs.writeFile('jobs.json', json, 'utf-8', () => {
        console.log('succesfully written data');
    });
    
    browser.close();
    return response;
};





module.exports = main;
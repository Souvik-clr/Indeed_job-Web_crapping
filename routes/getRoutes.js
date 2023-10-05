const express = require('express');
const router = express.Router();
//import puppeteer function
const main = require('../scrapeFn/scrape')
const path = require('path');

//sending homepage
router.get('/',async(req,res)=>{
    const htmlPath =path.join(__dirname,'public','index.html');
    res.sendFile(htmlPath);
  })

router.post('/indeed',async(req,res)=>{
    try {
    //  const {skill} = req.body;
    let skill = req.body.skill;
     console.log(skill);
     let scrape =await main(skill);
        return res.status(200).json({
          status: "ok",
          list: scrape?.list, //if scrape is null then "."operator will not work
        });
    } catch (error) {
        console.log(error);
      return res.status(500).send(error);
    }
  })

//router to getData
router.get('/getData',async(req,res)=>{
    try {
      const jobs =path.join(__dirname,'..','jobs.json')
      return res.status(200).sendFile(jobs);
    } catch (error) {
      return res.status(500).send(error);
    }
  })


module.exports = router;
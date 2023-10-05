const express = require('express');
const app = express();
const getRoutes = require('./routes/getRoutes.js')
const ngrok = require('ngrok');
// const PORT = process.env.PORT || 3000;
const PORT = 3001;
//middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/v1', getRoutes);

app.listen(PORT,()=>{
    console.log('Listening');      
});
// connecting ngrok (self calling fn)
// you can signup to ngrok website and get your own authToken
(async function(){
    const url = await ngrok.connect({
        proto:'http',
        addr:PORT,
        authtoken:'2WLgVmNpi0hsA6OsF8obNtoUBew_5ZshyU8PjWz1NpF8a2YY6'
    });
    console.log(url);
})();
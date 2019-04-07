const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');

const app = express();
//APP CONFIG
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))

//CONNECTING TO DB

mongoose.connect('mongodb://127.0.0.1:27017/iBlogApp-DB', {
    useNewUrlParser: true, 
    useCreateIndex: true,//help us to quickly access our database
    useFindAndModify: false
  });

//ROUTES
app.get('/', (req, res) =>{
    res.render('index')
});


let port = process.env.PORT;
if(port == null || port == ''){
  port = 3000
};
app.listen(port)

app.listen(3000, (req, res) => {
    console.log('The server is runing on port 3000')
})

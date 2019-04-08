const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');

const app = express();
//APP CONFIG
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
//CONNECTING TO DB

//LOCAL CONNECTION

// mongoose.connect('mongodb://127.0.0.1:27017/iBlogApp-DB', {
//     useNewUrlParser: true, 
//     useCreateIndex: true,//help us to quickly access our database
//     useFindAndModify: false
//   });


//DEPLOYED CODE TO ATLASS
  mongoose.connect('mongodb+srv://emmanuel:Paaputwu$2016@iblogapp-g06za.mongodb.net/iBlogApp-DB', {
    useNewUrlParser: true, 
    useCreateIndex: true,//help us to quickly access our database
    useFindAndModify: false
  });


//POST SCGEMA
const postSchema = mongoose.Schema({
  title: String,
  image: String,
  description: String
});

//POST MODEL
const Post = mongoose.model('Post', postSchema);

//POST SAMPLE
const newPost = new Post({
  title: 'How to win',
  image: '',
  content: 'Am really good for this'
})




//ROUTES
//HOME
app.get('/', (req, res) =>{
    res.redirect('/home')
});


//ADD NEW POST
//GETTING THE FORM
app.get('/addnewpost', (req, res) => {
  res.render('addNewPost')
});

//PROCESSING THE FORM
app.post('/addnewpost', (req, res) => {

  Post.create(req.body.blog, (error, createdPost) => {
    if(error){
      console.log(error)
    }else {
      console.log(createdPost)
      res.redirect('/')
    }
  })
})

// GETTING ALL POSTS
app.get('/home', (req, res) => {
  Post.find({}, (error, allPosts) => {
    if(error){
      console.log(error)
    }else{
      res.render('index', {allPosts: allPosts})
      
    }
  })
});


//MORE INFO ROUTE
app.get('/readmore', (req, res) => {
  res.render('readMore')
})

let port = process.env.PORT;
if(port == null || port == ''){
  port = 3000
};
app.listen(port)

app.listen(3000, (req, res) => {
    console.log('The server is runing on port 3000')
})

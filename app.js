const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');

const app = express();
//APP CONFIG
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
//CONNECTING TO DB

mongoose.connect('mongodb://127.0.0.1:27017/iBlogApp-DB', {
    useNewUrlParser: true, 
    useCreateIndex: true,//help us to quickly access our database
    useFindAndModify: false
  });

//POST SCGEMA
const postSchema = mongoose.Schema({
  title: String,
  image: String,
  content: String
});

//POST MODEL
const Post = mongoose.model('Post', postSchema);

//POST SAMPLE
const newPost = new Post({
  title: 'How to win',
  image: '',
  content: 'Am really good for this'
})

// newPost.save((error, post)=> {
//   if(error){
//     console.log(error)
//   }else {
//     console.log(post)
//   }
// })


//ROUTES
//HOME
app.get('/', (req, res) =>{
    res.render('index')
});


//ADD NEW POST
app.get('/addNewPost', (req, res) => {
  res.render('addNewPost')
});

app.post('/addnewpost', (req, res) => {

})

//ALL POSTS
app.get('/allposts', (req, res) => {
  res.render('allPosts')
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

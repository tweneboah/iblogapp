const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const methodOverride = require('method-override');

const app = express();
//APP CONFIG
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(methodOverride('_method'));
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

app.get('/post/:id', (req, res) => {
  Post.findById(req.params.id, (error, foundBlog) => {
    if(error){
      res.redirect('/blogs')
    }else{
      res.render('readMore', {post:foundBlog})
    }
  })
});

//GETTING EDIT FORM
app.get('/post/:id/edit', (req, res) => {
  Post.findById(req.params.id, (error, foundPost)=>{
    if(error){
      res.redirect('/')
    }else {
      res.render('edit', {post:foundPost})
    }
  })
});



//UPDATE ROUT
app.put('/post/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.blog, (error, updatePost)=> {
    if(error) {
      res.redirect('/addNewPost')
    }else{
      res.redirect('/post/' + req.params.id)
    }
  })
});


//DELETE ROUTE
app.delete('/post/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (error) => {
    if(error){
      console.log(error)
    }else{
      res.redirect('/')
    }
  })
});

//===========
//REGISTERING FORM
//===========
app.get('/register', (req, res) => {
  res.render('registerForm')
})

//===========
//REGISTERING FORM
//===========
app.get('/login', (req, res) => {
  res.render('login')
})

let port = process.env.PORT;
if(port == null || port == ''){
  port = 3000
};
app.listen(port)

app.listen(3000, (req, res) => {
    console.log('Runing IblogApp on port 3000')
})

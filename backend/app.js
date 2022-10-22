const express = require ( 'express' );
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
//const path = require('path');


const app = express();
//const postmodel = require('./models/post');
const postroutes = require('./routes/posts');
const  userRoutes = require("./routes/user");

mongoose.connect("mongodb+srv://bellil2:oussama123456@cluster0.gv64f.mongodb.net/?retryWrites=true&w=majority")
//mongoose.connect("mongodb+srv://bellil:oussama1234@cluster0.ngrgy.mongodb.net/?retryWrites=true&w=majority")
//                mongodb+srv://bellil1:oussama123456@cluster0.gv64f.mongodb.net/?retryWrites=true&w=majority

.then(()=>{
  console.log("Connected to database");
})
.catch(()=>{
  console.log("Connection Failed");
});

const path = require("path");
app.use("/images", express.static(path.join("backend/images")));

app.use(bodyparser.json());
app.use((req, res, next)=>{

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
 // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

//router.use((req, res, next) => {
 // res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
 // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
 // next();
//});


app.use("/api/user", userRoutes);
app.use(postroutes);

app.use(express.static('./dist/first-app'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/first-app/'}),
);

module.exports = app;

// app.post("/api/posts",(req, res, next)=>{
//   const post = new postmodel({
//     title: req.body.title,
//     content: req.body.content
//   });
//   post.save().then(result=>{

//     res.status(201).json({
//       message: 'Post added successfully',
//       postId: result._id


//     });
//     console.log(result);
//   });
// });

// app.put("/api/posts/:id", (req, res, next)=>{
//   const post = new postmodel({
//     _id: req.body.id,
//     title: req.body.title,
//     content: req.body.content
//   });
//   postmodel.updateOne({_id:req.params.id}, post).then(result =>{
//     console.log(result);
//     res.status(200).json({message: "Update Successful!"})
//   });
// });

// app.get("/api/posts/:id",(req, res, next)=>{

//   postmodel.findById(req.params.id).then(post =>{
//     if(post){
//       res.status(200).json(post);
//     }else{
//       res.status(484).json({message: 'Post not Found!'});
//     }
//   });

// });

// app.get('/api/posts', (req, res, next) =>{
//   postmodel.find()
//   .then((documents)=>{
//     console.log(documents);
//     res.status(200).json({
//       message: 'Posts Fetched Successfully',
//       posts: documents
//     });
//   });
// });

// // app.delete("/api/posts/:id",(req, res, next) => {
// //   console.log(req.params.id);
// //   postmodel.findOne({ _id: req.params.id }).then(
// //     (postmodel) => {
// //       if (!postmodel) {
// //         res.status(404).json({
// //           error: new Error('No such Thing!')
// //         });
// //       }

// //       postmodel.deleteOne({ _id: req.params.id }).then(
// //         () => {
// //           res.status(200).json({
// //             message: 'Deleted!'
// //           });
// //         }
// //       ).catch(
// //         (error) => {
// //           res.status(400).json({
// //             error: error
// //           });
// //         }
// //       );
// //     }
// //   )
// // });


// app.delete("/api/posts/:id", (req, res, next)=>{


//   postmodel.deleteOne({_id:req.params.id}).then(result=>{
//     console.log(req.params.id);
//     console.log(result);
//     res.status(200).json({
//       message:"Post deleted!"
//     });
//   });
// });

// //    app.use('/api/posts', (req, res, next) =>{
// //    const posts = [
// //     {
// //       id: 'snkfkjkf',
// //       title: 'First server-side post',
// //       content: 'This is comming from the server'
// //     },
// //     {
// //       id: 'gyrrshjhk',
// //       title: 'Second server-side post',
// //       content: 'This is commiing from the server'
// //     },
// //     {
// //       id: 'mhsetghj',
// //       title: 'Third server-side post',
// //       content: 'This is comming'
// //     }];
// //     res.status(200).json({
// //       message: 'Posts Fetched Successfully',
// //       posts: posts
// //     });
// // });



const express = require("express");

const router = express.Router();
const multer = require("multer");

const postmodel = require('../models/post');
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
let documentss = [];

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");
    if(isValid){
      error = null;
    }
    cb(null, "backend/images");

  },
  filename: (req, file, cb)=>{
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+ '-'+ Date.now()+ '.'+ ext);
}
});




//router.get();

//router.post("/api/posts",(req, res, next)=>{
  router.post("/api/posts",checkAuth, multer({storage: storage}).single("image"), (req, res, next)=>{
 // router.post("", multer(storage).single("image"), (req, res, next)=>{
   console.log(req.userData.userId);
  const url = req.protocol + '://'+ req.get("host");
  const post = new postmodel({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/"+req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(result=>{
    res.status(201).json({
      message: 'Post added successfully',
      //postId: result._id
      post: {
        ...result,
        id: result._id,
      }

    });
  });
});

router.put("/api/posts/:id", checkAuth ,multer({storage: storage}).single("image"),  (req, res, next)=>{
 // const url = req.protocol + '://'+ req.get("host");
 let imagePath = req.body.imagePath;

 if(req.file){
  const url = req.protocol + '://'+ req.get("host");
  imagePath = url + "/images/"+req.file.filename;
}
  const post = new postmodel({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
    //imagePath: url + "/images"+req.file.filename
  });

  console.log("hello");

  //postmodel.updateOne({_id:req.params.id}, post).then(result =>{
    postmodel.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
    //console.log(req.userData.userId);
   // res.status(200).json({message: "Update Successful!"});
   if(result.modifiedCount>0){
    //console.log(result);
    res.status(200).json({ message: "Update successful!" });
  }else{
    res.status(401).json({ message: "Not Authorized!" });
  }
  });
});

router.get('/api/posts',checkAuth, (req, res, next) =>{
  //console.log("salutt");
  //console.log(req.token);
  console.log(req.userData.userId);

  const PageSize = req.query.pagesize;
  const CureentPage = req.query.currentpage;
  const postquery = postmodel.find();
  if(PageSize && CureentPage){
    //postquery.skip(PageSize * (CureentPage-1));
    postquery.skip(PageSize * (CureentPage-1))
    .limit(PageSize);
  }

  postquery
    .then((documents)=>{
      //console.log(documents);
      documentss=documents;
      //console.log(documentss);
      return postmodel.count();

    }).then(count => {
      //console.log(documentss);
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: documentss,
        maxPosts: count
      });
    });

  //postmodel.find()
  //.then((documents)=>{
   // postquery
    //.then((documents)=>{
      //return postmodel.count();
    //console.log(documents);
    //res.status(200).json({
      //message: 'Posts Fetched Successfully',
     // posts: documents
   // });
  //});
});

router.get("/api/posts/:id",checkAuth,(req, res, next)=>{
  postmodel.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(484).json({message: 'Post not Found!'});
    }
  });
});

router.delete("/api/posts/:id",checkAuth, (req, res, next)=>{

  //postmodel.deleteOne({_id:req.params.id}).then(result=>{
    postmodel.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    if(result.deletedCount > 0){
      res.status(200).json({ message: "Delete successful!" });
    }else{
      res.status(401).json({ message: "Not Authorized!" });
    }
  });
});

module.exports = router;

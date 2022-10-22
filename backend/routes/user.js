//const express = ("express");
const express = require ( 'express' );
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require('typescript');
//const bcrypt = require("bcrypt");

router.post("/signup");

router.post("/signup", (req, res, next) =>{

  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    //const NewUser = user({
      const user = new User({
      email: req.body.email,
      password: hash
      //email: req.body.password
    });
   //console.log(user[email]);
    user.save()
    .then(result =>{
      if(result){
      res.status(201).json({
        message: "User Created",
        result: result
      });
//createToken();


    }

    });

    //this.generateAccessToken(user.email,user._id);

  }).catch(err =>{
    res.status(500).json({
      error: err
    });
  });



});


function generateAccessToken(email,userId){
  return jwt.sign({email, userId},'A_very_long_string_for_our_secret',{expiresIn: '1h'})

  }

router.post("/login",(req, res, next)=> {

  let fetcheduser;

  User.findOne({email: req.body.email})
     .then(user1=>{
         if(!user1){
            return res.status(401).json({
                 message: "Auth failed1111"
            });
                  }

               fetcheduser=user1;
                aa=user1;
              return bcrypt.compare(req.body.password, fetcheduser.password);
      })
      .then(result => {
        //console.log(result);
              if(!result){
                   return res.status(401).json({
                   message: "Auth failed2222"
                  });
                }



     // const token = jwt.sign();
     //let dd=fetcheduser[email];
    // console.log(aa);
     const token = jwt.sign({email: fetcheduser.email, userId: fetcheduser._id},
      'A_very_long_string_for_our_secret',
        { expiresIn: "1h"}
        );


        res.status(200).json({
          token: token,
          expiresIn: 3600,
          userId: fetcheduser._id
         // userId: fetcheduser.email,

        });





      })
      .catch(err =>{
      return res.status(401).json({
        message: "Auth failed"
      });
  //});

});



});



module.exports = router;

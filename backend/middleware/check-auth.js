

//const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");


module.exports = (req, res, next)=>{

  try{
   const token = req.headers.authorization.split(" ")[1];
    //const token = req.headers.authorization.split(' ')[1];

    //jwt.verify(token,"A_very_long_string_for_our_secret");
    const decodedToken = jwt.verify(token,"A_very_long_string_for_our_secret");
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};

     next();


      //const bearerheader = req.headers['Authorization']

     // if(typeof bearerheader !== 'undefined'){
        //   const bearer=bearerheader.split(' ');
          // const bearertoken=bearer[1];
           //req.token=bearertoken;
           //console.log(bearertoken);
           //next();

    //  }


    }catch(error){
      res.status(401).json({
        message: "Auth Failedhhhhhhh",
        error: error
      });
    }

};

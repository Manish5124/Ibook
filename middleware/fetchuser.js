var jwt = require('jsonwebtoken');

const JWT_SECRET = "manish123";

fetchuser = (req,res,next)=>{
    console.log("inside the middleware");
   
    // if(!token)
    // {
    //     return res.status(401).send({error:'Please authenticate with a valid token'})
    // }
    try {
        const token = req.header('auth-token');
        console.log("token is =",token)
        var decoded = jwt.verify(token, 'manish123');
        console.log("decoded=",decoded)
        req.user = decoded.user;
        next();       
    } catch (error) {
        res.status(401).send({error:'Please authenticate with a valid token'})
    }
    
 
}


module.exports = fetchuser;
const jwt = require('jsonwebtoken');

module.exports =  function(req, res, next){
        
    const token_bearer = req.header('Authorization');
    if(!token_bearer) return res.status(401).send('Access Denied');
    //console.log(token_bearer);
        const token_array = token_bearer.split(" ");
        const token = token_array[1]
        //console.log(token);
        try{
                const verified = jwt.verify(token,'token-secret');
                req.user = verified;
                next();
        }
        catch(err){
                res.status(400).send('Invalid Token');
        }
}
var jwt = require('jsonwebtoken');
function auth(req,res,next){
    let token = req.headers.authorization;
    var decoded = jwt.verify(token, 'mock-10');
    console.log(decoded);
    req.body.email = decoded.email;
    req.body.date = decoded.date;
    next();
}
module.exports = auth;
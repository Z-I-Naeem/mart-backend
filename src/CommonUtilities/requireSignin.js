const jwt = require('jsonwebtoken');


exports.requireSignin = (req, res, next) => {

        if(req.headers.authorization){

                const token = req.headers.authorization.split(' ')[1]
                const user = jwt.verify(token, process.env.MERN_LUKOCURI)
                req.user = user
                next()

        }else{
                return res.status(401).json({msg:'Authorization Required!!!!!!!'})
        }

}

exports.isAdmin = (req, res, next) => {
        
        if(req.user.role !== 'admin') return res.status(401).json({ msg:"Access Denied!!!" })
        else{ next() }
}
exports.isUser = (req, res, next) => {
        
        if(req.user.role !== 'user') return res.status(401).json({ msg:"Sign in required!!!" })
        else{ next() }
}
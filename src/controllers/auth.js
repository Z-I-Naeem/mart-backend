const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = ( req , res ) => {

    const {firstName, lastName, email, password,role} = req.body 

    User.findOne({email}).exec((err,user) => {
        // console.log(user);
        
        if (user) {
            (user.role=='admin') ?  res.status(400).json({ message: 'Admin already exist !!' }):
             res.status(400).json({ message: 'User already exist !!' })
        }
        
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                role: role || 'user',
                userName: lastName.concat('_',parseInt( Math.floor(Math.random() * (10000000 - 1))) + 1)
            })


            _user.save((err, data) => {
                if(err){
                    return res.status(400).json({
                        message: 'Something went wrong !!', err
                    })   
                }

                return res.status(201).json({
                        message: (role=='admin')?'Admin created successfully ..':'User created successfully ..',
                        user:data
                })
            })
        
    })

}



exports.signin = ( req , res ) => {

    const {email,password} = req.body

    User.findOne({email}).exec((err, user) => {
        if (err) return res.status(400).json({err})
        console.log(user);
        if (user) {
            console.log(user.authenticate(password));

            if(user.authenticate(password)){
                const token = jwt.sign({_id:user._id, role:user.role} , process.env.MERN_LUKOCURI , {expiresIn:'1d'})
                const {firstName,lastName,email,role,fullName,_id} = user
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName
                    }
                })
            }else{
                res.status(400).json({
                    message:"Invalid credentials"
                })
            }

        }else{
            return res.status(400).json({message:'something went wrong!!'})
        }
    })
}





// exports.requireSignin = (req, res, next) => {

//     const token = req.headers.authorization.split(' ')[1]
//     const user = jwt.verify(token, process.env.MERN_LUKOCURI)
//     req.user = user
//     next()

// }







// require the model or schema
// exports.function_name
// mongoose.findOne({obj}).exec(err, anyName)  *** must to write the err argument || get an error
// name.save(callback(err,any))  ** must have the err

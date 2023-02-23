const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, 
        trim: true,
        min: 3,
        max: 40
    },
    lastName: {
        type: String,
        required: true, 
        trim: true,
        min: 3,
        max: 40
    },
    userName: {
        type: String,
        required: true, 
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true

    },
    // password: {
    //     type: String, 
    //     required: true,
    // },
    hash_password: {
        type: String, 
        required: true,
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
}, {timestamps: true})




userSchema.virtual('password')
.set( function(pass) {
    // console.log(pass);
    
    this.hash_password = bcrypt.hashSync(pass , 10 )
    // console.log(this.hash_password);
})

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate: function(password){
        console.log(password);
        console.log(this.hash_password);
       return bcrypt.compareSync(password , this.hash_password)
    }
}


// console.log(userSchema.virtuals['password'].setters[0]);




module.exports= mongoose.model('User', userSchema)







// define mongoose 
//  define user schema
//  must define module.exports = mongoose.model(name, userSchema)
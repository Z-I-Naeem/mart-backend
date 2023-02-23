const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const path = require('path');
const userRoute =  require('./routes/user.js');
const categoryRoutes =  require('./routes/category.js');
const productRoutes =  require('./routes/product.js');
const cartRoutes =  require('./routes/cart');

const app = express()

app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({
    extended: true
}));



app.use('/api',userRoute)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)



const port = 5000 || process.env.PORT


const URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.hjgivfc.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(
        URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: process.env.MONGO_DB_DB
            }
    )
    .then(res => {
        console.log('working');
    })
    .catch(err => {
        console.log(err);
    })


// mongoose.set('strictQuery', true)

app.get('/', (req, res) => {

    res.send('Hi I am working fine!!')

})


app.listen(port, () => {
    console.log("Listening on port", port);
})


















//  steps to develop with express
// 1. First require express
// 2. then declare a variable app = express ()
// 3. app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// })); for recieving data in json 

// 4. declare port
// 5. declare app.get for a testing message
// 6. app.listen to start listening on the server. 
// require('dotenv').config() for env files
// require mongoose or mongodb for database
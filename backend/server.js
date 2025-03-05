require('dotenv').config()

const express = require('express')
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const mongoose = require('mongoose');


const app = express()
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.json({mssg: 'Hello World!'})
})

// routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes)

// connect to the db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to db and Server started")
        });
    })
    .catch((error) => {
        console.log(error)

    })

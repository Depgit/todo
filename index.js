const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const cors = require('cors');

const PORT = process.env.PORT || 8080;


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to MongoDB');
});

//middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', require('./routes/auth'));

if (process.env.NODE_ENV == "production") {
    app.use(express.static('todo/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'todo', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

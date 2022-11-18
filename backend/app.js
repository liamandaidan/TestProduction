const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const postmodel = require('./models/post');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
mongoose.connect(`mongodb+srv://${dotenv.parsed.USERNAME}:${dotenv.parsed.PASSWORD}@cluster0.g5tr3ds.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true })
  .then(() => { console.log('connected to db') }).catch(() => { console.log('Connection failed') });

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new postmodel({ title: req.body.title, content: req.body.content });
  //console.log(post);
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });

})

app.get('/api/posts', (req, res, next) => {
  postmodel.find().then((resp) => {
    // console.log(resp);
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: resp
    })
  });
})

app.delete('/api/posts/:id', (req, res, next) => {
  postmodel.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result)
    res.status(200).json({
      message: "Post deleted!"
    });
  });

})


module.exports = app;

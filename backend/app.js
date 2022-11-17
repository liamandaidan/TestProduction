const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const postmodel = require('./models/post');

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
  res.status(201).json({ message: 'Post added successfully' });
})

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'snkfkjkf',
      title: 'First server-side post',
      content: 'This is comming from the server'
    },
    {
      id: 'gyrrshjhk',
      title: 'Second server-side post',
      content: 'This is commiing from the server'
    },
    {
      id: 'mhsetghj',
      title: 'Third server-side post',
      content: 'This is comming from the server'
    }
  ];

  res.status(200).json({
    message: 'Posts Got successfully',
    posts: posts
  });
})


module.exports = app;

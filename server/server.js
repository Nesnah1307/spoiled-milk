const express = require('express');
const {ApolloServer} = require('apollo-server');
const path = require('path');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleWare} = require('./utils/auth');
const connectDB = require('./config/db');
const routes = require('./routes');
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://spoiledmilk:UofUbootcamp@cluster0.mmquk.mongodb.net/?retryWrites=true&w=majority"
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleWare,
  cache: 'bounded',
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/spoiled-milk', {
  //useNewUrlParser: true,
 // useFindAndModify: false
//});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// const startApolloServer = async (typeDefs, resolvers) => {
//   await server.start();
//   server.applyMiddleware({ app });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});



// db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
// })
//};
//connectDB();
//startApolloServer(typeDefs, resolvers);
const express = require('express');
const path = require('path');
const express = require("express");
// Import the ApolloServer class
const { ApolloServer } = require('apollo-server-express');
// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware }= require ("./utils/auth")

const db = require('./config/connection');
//const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//Apollo and Express
server.applyMiddleware({ app });

//Middleware parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const _dirname= path.dirname("");
const buildPath = path.join(_dirname, "../client/build");
app.use(express.statics(buildPath));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
}
);


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server 🌍 running on port:${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');
const Post = require('./models/Post.js');


// const typeDefs = gql`
//     type Query {
//         sayHi: String!
//     }
// `;

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Query {
        getPosts: [Post]
    }
`;


const resolvers =  {
    Query: {
        // sayHi: () => 'Hello World!!!!!'
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {}).then(() => {
    console.log('MongoDB connected');
    return server.listen({port: 5000});
}).then(res => {
    console.log(`Server running at ${res.url}`);
});

// server.listen({port: 5000}).then(res => {
//     console.log(`Server running at ${res.url}`);
// });
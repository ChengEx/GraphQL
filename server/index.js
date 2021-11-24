// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import postRoutes from './routes/posts.js';
// import userRoutes from './routes/users.js';

// const app = express();
// dotenv.config();


// app.use(bodyParser.json({limit:"30mb",extended: true}));
// app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));
// app.use(cors());
// app.use('/posts',postRoutes);
// app.use('/user',userRoutes);


// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
//     .then(()=> app.listen(PORT,()=>console.log(`Server runing on port: ${PORT}`)))
//     .catch((error)=>console.log(error.message));
import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/posts.js'

const server = new ApolloServer({

    typeDefs: typeDefs,
    resolvers: resolvers,
});

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true })
    .then(()=> {
        return server.listen({ port: 3000 })
    });
                                                                                         


server.listen({ port: 3000}).then(res =>{
    //console.log(res);
    console.log(`Server running at ${res.url}`)
})
import { gql } from 'apollo-server';
const typeDefs = gql`
    type PostMessage {
        id: ID!
        title: String!
        message: String!
        username: String!
        creator: String!
        selectedFile: String!
        likes: [Like]!
        tags: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        username: String!
    }

    type User{
        id: ID!
        username: String!
        email: String!
        password: String!
        token: String!
    }

    type Query{
        getPosts: [PostMessage]
    }
`;

export default typeDefs;
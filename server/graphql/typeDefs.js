import { gql } from 'apollo-server';
const typeDefs = gql`
    type PostMessage {
        id: ID!
        title: String!
        message: String!
        name: String!
        creator: String!
        selectedFile: String!
        likes: [Like]!
        tags: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        name: String!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        password: String!
        token: String!
    }

    type Query{
        getPosts: [PostMessage]
    }

    input RegisterInput {
        email: String!
        password: String!
        name: String!
    }

    type Mutation{
        createPost(title: String!, message: String!): PostMessage!
        register(registerInput: RegisterInput): User!
        login(email:String!, password:String!): User!

    }
`;

export default typeDefs;
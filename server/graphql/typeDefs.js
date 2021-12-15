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
        tags: [String]!
        createdAt: String!
    }

    type Like {
        id: ID!
        userId: String
        name: String
        createdAt: String
    }

    type User{
        id: ID!
        name: String!
        email: String!
        password: String!
        token: String!
    }

    type Query{
        getPosts: [PostMessage]!
    }

    input RegisterInput {
        name: String
        email: String
        password: String
    }

    input CreateMessage { 
        title: String
        message: String
        tags: String
        selectedFile: String
    }

    input UpdateMessage {
        id: ID
        title: String
        message: String
        tags: String
        selectedFile: String
    }



    type Mutation{
        createPost(createMessage: CreateMessage): PostMessage!
        updatePost(updateMessage: UpdateMessage): PostMessage!
        deletePost(id: ID): PostMessage!
        register(registerInput: RegisterInput): User!
        login(email:String, password:String): User!
        likePost(id: ID): PostMessage!
    }
    # type Subscription {
    #     newPost: PostMessage!
    # }
`;

export default typeDefs;
import postResolvers from './posts.js';

const resolvers = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...postResolvers.Mutation
    }
}

export default resolvers;
import postResolvers from './posts.js';
import userResolvers from './user.js';

const resolvers = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...postResolvers.Mutation,
        ...userResolvers.Mutation
    },
    // Subscription: {
    //     ...postResolvers.Subscription
    // }
}

export default resolvers;
import postResolvers from './posts';

const resolvers = {
    Query: {
        ...postResolvers.Query
    }
    // ,
    // Mutation: {
    //     ...postResolvers.Mutation
    // }
}
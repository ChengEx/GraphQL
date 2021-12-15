import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            title
            message
            name
            creator
            selectedFile
            likes {
                id
                name
            }
            createdAt
        }
    }
`;
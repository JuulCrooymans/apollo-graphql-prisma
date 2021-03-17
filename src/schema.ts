import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date
  type Post {
    id: Int!
    title: String!
    content: String
    createdAt: Date!
  }

  type PostResponse {
    success: Boolean
    message: String!
  }

  type Query {
    posts: [Post!]
  }

  type Mutation {
    addPost(title: String!, content: String): PostResponse!
  }
`;

import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Error {
    success: Boolean
    message: String
  }

  type Post {
    id: Int!
    title: String!
    content: String
    createdAt: Date!
  }

  type User {
    userId: Int!
    email: String
    username: String
    password: String
    createdAt: Date
  }

  type PostResponse {
    success: Boolean
    message: String!
  }

  type Query {
    posts: [Post!]
    user(email: String!): User
  }

  type Mutation {
    addPost(title: String!, content: String): PostResponse!
  }
`;

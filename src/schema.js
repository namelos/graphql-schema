// import * as _ from 'underscore';

// This is the Dataset in our blog
import PostsList from './data/posts';
// import AuthorsList from './data/authors';
// import {CommentList, ReplyList} from './data/comments';

import {
  GraphQLInt as Int,
  GraphQLFloat as Float,
  GraphQLString as String,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLEnumType as EnumType,
  GraphQLNonNull as NonNull,
  GraphQLSchema as Schema
} from 'graphql'

const Post = new ObjectType({
  name: 'Post',
  description: 'This represent a Post',
  fields: () => ({
    _id: {
      type: new NonNull(String)
    },
    title: {
      type: new NonNull(String),
      resolve: ({ title }) => title || 'Does not exist'
    },
    content: {
      type: String
    }
  })
})

export default new Schema({
  query: new ObjectType({
    name: 'BlogSchema',
    description: 'Root of the Blog Schema',
    fields: () => ({
      echo: {
        type: String,
        description: 'Echo what you enter',
        args: {
          message: {
            type: String,
            description: 'Give me a message'
          }
        },
        resolve: (source, { message }) => `received ${ message }`
      },
      posts: {
        type: new List(Post),
        resolve: () => PostsList
      }
    })
  })
})


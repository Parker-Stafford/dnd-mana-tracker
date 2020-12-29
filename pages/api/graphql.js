/* eslint-disable camelcase */
import { gql, ApolloServer } from 'apollo-server-micro';
import prisma from '../../database/config';

const typeDefs = gql`
  type Query {
    characters(user_id: ID!): [Character!]
  }

  type Mutation {
    createCharacter(
      name: String,
      current_mana: Int,
      max_mana: Int,
      photo_url: String,
      level: Int,
      mana_pots: Int,
      greater_pots: Int,
      user_id: Int
    ): Character
  }

  type Character {
    id: ID!
    name: String!
    current_mana: Int!
    max_mana: Int!
    photo_url: String
    level: Int!
    mana_pots: Int
    greater_pots: Int
    user_id: Int!
  }
`;

const resolvers = {
  Query: {
    characters: (_parent, args) => (
      prisma.characters.findMany({
        where: { user_id: +args.user_id },
        orderBy: { id: 'asc' },
      })
    ),
  },
  Mutation: {
    createCharacter(_parent, data) {
      const id = data.user_id;
      const query = { data: {} };
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== 'user_id') {
          query.data[keys[i]] = data[keys[i]];
        } else {
          query.data.users = { connect: { id } };
        }
      }
      query.data.users.connect = { id };
      return prisma.characters.create(query);
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: process.env.DEVELOPEMENT,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });

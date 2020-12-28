import { gql, ApolloServer } from 'apollo-server-micro';
import prisma from '../../database/config';

const typeDefs = gql`
  type Query {
    characters(user_id: ID!): [Character!]
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
    characters: (_parent, args, _context) => (
      prisma.characters.findMany({
        where: { user_id: +args.user_id },
        orderBy: { id: 'asc' },
      })
    ),
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });

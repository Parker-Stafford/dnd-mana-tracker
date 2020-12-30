import prisma from '../database/config';

const resolvers = {
  Query: {
    characters: (_parent, args) => (
      prisma.characters.findMany({
        where: { user_id: +args.user_id },
        orderBy: { id: 'asc' },
      })
    ),
    character: (_parent, args) => (
      prisma.characters.findUnique({
        where: { id: +args.id },
      })
    ),
  },
  Mutation: {
    createCharacter(_parent, data) {
      const id = data.user_id;
      const char = { data: {} };
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== 'user_id') {
          char.data[keys[i]] = data[keys[i]];
        } else {
          char.data.users = { connect: { id } };
        }
      }
      char.data.users.connect = { id };
      return prisma.characters.create(char);
    },
  },
};

export default resolvers;

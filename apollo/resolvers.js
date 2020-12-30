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
    upsertCharacter(_parent, data) {
      const userId = data.user_id;
      const id = +data.id || 0;
      const char = {
        where: { id },
        update: {},
        create: { users: { connect: { id: userId } } },
      };
      const keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== 'user_id' && keys[i] !== 'id') {
          if (!data[keys[i]]) {
            char.create[keys[i]] = data[keys[i]];
          } else {
            char.update[keys[i]] = data[keys[i]];
            char.create[keys[i]] = data[keys[i]];
          }
        }
      }
      return prisma.characters.upsert(char);
    },
    async deleteCharacter(_parent, args) {
      const id = +args.id;
      return prisma.characters.delete({
        where: { id },
      });
    },
  },
};

export default resolvers;

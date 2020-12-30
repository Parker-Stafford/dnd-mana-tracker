import { gql } from '@apollo/client';

const typeDefs = gql`
  type Query {
    characters(user_id: ID!): [Character!]
    character(id: ID!): Character!
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
    current_mana: Int
    max_mana: Int!
    photo_url: String
    level: Int
    mana_pots: Int
    greater_pots: Int
    user_id: Int!
  }
`;

export default typeDefs;

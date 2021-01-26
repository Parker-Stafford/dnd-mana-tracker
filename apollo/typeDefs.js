import { gql } from '@apollo/client';

const typeDefs = gql`
  type Query {
    characters(user_id: ID!): [Character!]
    character(id: ID!): Character!
  }


  type Mutation {
    upsertCharacter(
      name: String,
      current_mana: Int,
      max_mana: Int,
      photo_url: String,
      level: Int,
      mana_pots: Int,
      greater_pots: Int,
      user_id: Int,
      id: ID
    ): Character!

    deleteCharacter(id: ID!): Character

    deleteUser(id: ID!): User

    upsertCampaign(
      id: ID,
      name: String,
      mana_pot_value: Int,
      greater_pot_value: Int,
      cantrip_cost: Int,
      spell_1_cost: Int,
      spell_2_cost: Int,
      spell_3_cost: Int,
      spell_4_cost: Int,
      spell_5_cost: Int,
      spell_6_cost: Int,
      spell_7_cost: Int,
      spell_8_cost: Int,
      spell_9_cost: Int,
      user_id: Int,
    ): Campaign!
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

  type Campaign {
    id: ID!
    name: String!
    mana_pot_value: Int
    greater_pot_value: Int
    cantrip_cost: Int
    spell_1_cost: Int
    spell_2_cost: Int
    spell_3_cost: Int
    spell_4_cost: Int
    spell_5_cost: Int
    spell_6_cost: Int
    spell_7_cost: Int
    spell_8_cost: Int
    spell_9_cost: Int
    user_id: Int!
  }

  type User {
    id: ID!
    name: String
    email: String
    email_verified: String
    image: String
    created_at: String!
    updated_at: String!
  }
`;

export default typeDefs;

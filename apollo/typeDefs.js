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
      manaPotValue: Int,
      greaterPotValue: Int,
      cantripCost: Int,
      spell1Cost: Int,
      spell2Cost: Int,
      spell3Cost: Int,
      spell4Cost: Int,
      spell5Cost: Int,
      spell6Cost: Int,
      spell7Cost: Int,
      spell8Cost: Int,
      spell9Cost: Int,
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
    manaPotValue: Int
    greaterPotValue: Int
    cantripCost: Int
    spell1Cost: Int
    spell2Cost: Int
    spell3Cost: Int
    spell4Cost: Int
    spell5Cost: Int
    spell6Cost: Int
    spell7Cost: Int
    spell8Cost: Int
    spell9Cost: Int
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

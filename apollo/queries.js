import { gql } from '@apollo/client';

export function GET_CHARACTERS(userId, client) {
  return client.query({
    query: gql`
      query GetCharacters {
        characters(user_id: ${userId}) {
          id
          name
          current_mana
          max_mana
          photo_url
          level
          mana_pots
          greater_pots
        }
      }
    `,
  });
}

export function GET_CHARACTER(id, client) {
  return client.query({
    query: gql`
      query GetCharacter {
        character(id: ${id}) {
          id
          name
          current_mana
          max_mana
          photo_url
          level
          mana_pots
          greater_pots
        }
      }
    `,
  });
}

export const UPSERT_CHARACTER = gql`
  mutation UpsertCharacter($name: String, $currentMana: Int, $maxMana: Int, $photoUrl: String, $level: Int, $manaPots: Int, $greaterPots: Int, $user_id: Int, $id: ID) {
    upsertCharacter(name: $name, current_mana: $currentMana, max_mana: $maxMana, photo_url: $photoUrl, level: $level, mana_pots: $manaPots, greater_pots: $greaterPots, user_id: $user_id, id: $id) {
      id
      name
      current_mana
      max_mana
      photo_url
      level
      mana_pots
      greater_pots
    }
  }
`;

export const UPSERT_CAMPAIGN = gql`
  mutation UpsertCampaign( $id: ID, $name: String, $manaPotValue: Int, $greaterPotValue: Int, $cantripCost: Int, $spell1Cost: Int, $spell2Cost: Int, $spell3Cost: Int, $spell4Cost: Int, $spell5Cost: Int, $spell6Cost: Int, $spell7Cost: Int, $spell8Cost: Int, $spell9Cost: Int, $user_id: Int) {
    upsertCampaign(id: $id, name: $name, mana_pot_value: $manaPotValue, greater_pot_value: $greaterPotValue, cantrip_cost: $cantripCost, spell_1_cost: $spell1Cost, spell_2_cost: $spell2Cost, spell_3_cost: $spell3Cost, spell_4_cost: $spell4Cost, spell_5_cost: $spell5Cost, spell_6_cost: $spell6Cost, spell_7_cost: $spell7Cost, spell_8_cost: $spell8Cost, spell_9_cost: $spell9Cost, user_id: $user_id) {
      id
      name
      mana_pot_value
      greater_pot_value
      cantrip_cost
      spell_1_cost
      spell_2_cost
      spell_3_cost
      spell_4_cost
      spell_5_cost
      spell_6_cost
      spell_7_cost
      spell_8_cost
      spell_9_cost
    }
  }
`;

export const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($id: ID!) {
    deleteCharacter(id: $id) {
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      email
    }
  }
`;

import { gql } from '@apollo/client';

export function GET_CHARACTERS(id, client) {
  return client.query({
    query: gql`
      query GetCharacters {
        characters(user_id: ${id}) {
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

export const CREATE_CHARACTER = gql`
  mutation CreateCharacter($name: String!, $currentMana: Int!, $maxMana: Int!, $photoUrl: String, $level: Int!, $manaPots: Int!, $greaterPots: Int!, $user_id: Int!) {
    createCharacter(name: $name, current_mana: $currentMana, max_mana: $maxMana, photo_url: $photoUrl, level: $level, mana_pots: $manaPots, greater_pots: $greaterPots, user_id: $user_id) {
      name
      id
      photo_url
      level
      current_mana
      max_mana
    }
  }
`;

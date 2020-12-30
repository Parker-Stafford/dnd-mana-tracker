import { gql } from '@apollo/client';
import client from './config';

export default function GET_CHARACTERS(id) {
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

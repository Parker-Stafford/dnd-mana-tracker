import React from 'react';

export default function DeleteMessage({ error, data }) {
  return (
    <>
      {data && (
        <div>{data.deleteCharacter.name} deleted!</div>
      )}
      {error && (
        <div>error deleting character</div>
      )}
    </>
  );
}

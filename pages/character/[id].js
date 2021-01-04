import React, { useState } from 'react';
import Head from 'next/head';
import { useSession, getSession } from 'next-auth/client';
import { useMutation } from '@apollo/client';
import { initializeApollo } from '../../apollo/config';
import { GET_CHARACTER, DELETE_CHARACTER, UPSERT_CHARACTER } from '../../apollo/queries';
import SignIn from '../../components/SignIn';
import DeleteMessage from '../../components/DeleteMessage';
import DeletePopup from '../../components/DeletePopup';
import UpdatePopup from '../../components/UpdatePopup';
import SpellCaster from '../../components/SpellCaster';
import ManaChanger from '../../components/ManaChanger';
import NavBar from '../../components/NavBar';
import {
  CharImg,
  ManaBar,
  CharWrapper,
  ImageDiv,
  AddButton,
  BasicHeader,
  InfoDiv,
  PotionDiv,
  PotionWrap,
  ManaChangerTitle,
  ManaDiv,
  PotsAndRests,
  CharButtons,
  ButtonsDiv,
} from '../../styles/character.styles';
import { BlueButton } from '../../styles/index.styles';

export default function Character({ initialCharacter, userId }) {
  const [session, loading] = useSession();
  const [char, setChar] = useState(initialCharacter);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [deleteMutation, { data: deleteData, error: deleteError }] = useMutation(DELETE_CHARACTER);
  const [upsertChar, { error: upsertError }] = useMutation(UPSERT_CHARACTER);

  async function deleteChar() {
    await deleteMutation({ variables: { id: char.id } });
  }

  function openUpdate() {
    setShowUpdate(true);
  }
  function closeUpdate() {
    setShowUpdate(false);
  }
  function openDelete() {
    setShowDelete(true);
  }
  function closeDelete() {
    setShowDelete(false);
  }

  async function updateChar(update) {
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
    closeUpdate();
  }

  async function drinkPotion(event) {
    const potionType = event.target.id;
    const update = {
      variables:
      {
        id: char.id,
        user_id: userId,
        maxMana: char.max_mana,
        name: char.name,
        level: char.level,
      },
    };
    if (potionType === 'manaPots') {
      update.variables[potionType] = char.mana_pots - 1;
      update.variables.currentMana = Math.min(char.current_mana + 10, char.max_mana);
    } else {
      update.variables[potionType] = char.greater_pots - 1;
      update.variables.currentMana = Math.min(char.current_mana + 20, char.max_mana);
    }
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
  }

  async function takeRest(event) {
    const restType = event.target.id;
    const update = {
      variables:
      {
        id: char.id,
        user_id: userId,
        maxMana: char.max_mana,
        name: char.name,
        level: char.level,
      },
    };
    if (restType === 'shortRest') {
      update.variables.currentMana = Math.min(char.current_mana + 10, char.max_mana);
    } else {
      update.variables.currentMana = char.max_mana;
    }
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
  }

  async function castSpell(cost, gain = false) {
    const update = {
      variables: {
        id: char.id,
        user_id: userId,
        maxMana: char.max_mana,
        name: char.name,
        level: char.level,
      },
    };
    if (gain) {
      update.variables.currentMana = Math.min(char.max_mana, char.current_mana + cost);
    } else {
      update.variables.currentMana = Math.max(0, char.current_mana - cost);
    }
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
  }

  async function addPotion(event) {
    const update = {
      variables: {
        id: char.id,
        user_id: userId,
        maxMana: char.max_mana,
        name: char.name,
        level: char.level,
      },
    };
    const potType = event.target.id;
    if (potType === 'addMPot') {
      update.variables.manaPots = char.mana_pots + 1;
    } else {
      update.variables.greaterPots = char.greater_pots + 1;
    }
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
  }

  async function levelUp() {
    const update = {
      variables: {
        id: char.id,
        user_id: userId,
        maxMana: char.max_mana,
        name: char.name,
        level: char.level + 1,
      },
    };
    const { data } = await upsertChar(update);
    setChar(data.upsertCharacter);
  }

  return (
    <>
      <Head>
        <title>{char.name}</title>
      </Head>
      {loading && (
        <div>loading...</div>
      )}
      {!session && (
        <SignIn />
      )}
      {session && (
        <>
          <NavBar session={session} />
          {deleteData && (
          <DeleteMessage data={deleteData} />
          )}
          {!deleteData && (
          <>
            <CharWrapper>
              <ImageDiv>
                <CharImg src={char.photo_url || 'https://i.imgur.com/29DHf92.png'} alt="Character" />
                <h3>{char.name}</h3>
              </ImageDiv>
              <InfoDiv>
                <BasicHeader>Level:</BasicHeader>
                {char.level} <AddButton type="button" onClick={levelUp}>+</AddButton>
              </InfoDiv>
              <InfoDiv>
                <BasicHeader>Mana:</BasicHeader>{char.current_mana}/{char.max_mana}
                <ManaBar now={(char.current_mana / char.max_mana) * 100} label={`${char.current_mana}/${char.max_mana}`} />
                <PotionWrap>
                  <ManaDiv>
                    <ManaChangerTitle>Modify</ManaChangerTitle>
                  </ManaDiv>
                  <ManaDiv>
                    <ManaChanger manaFunc={castSpell} />
                  </ManaDiv>
                </PotionWrap>
              </InfoDiv>
              <PotsAndRests>
                <PotionWrap>
                  <PotionDiv>
                    <h6>Mana potions:</h6>
                    <BlueButton id="manaPots" type="button" disabled={!char.mana_pots} onClick={drinkPotion}><i className="fas fa-flask" /> {char.mana_pots}</BlueButton>
                    <AddButton id="addMPot" type="button" onClick={addPotion}>+</AddButton>
                  </PotionDiv>
                  <PotionDiv>
                    <h6>Greater mana potions:</h6>
                    <BlueButton id="greaterPots" type="button" disabled={!char.greater_pots} onClick={drinkPotion}><i className="fas fa-flask" />  {char.greater_pots}</BlueButton>
                    <AddButton id="addGPot" type="button" onClick={addPotion}>+</AddButton>
                  </PotionDiv>
                </PotionWrap>
                <PotionWrap>
                  <h6>Rests:</h6>
                  <PotionDiv>
                    <BlueButton id="shortRest" type="button" onClick={takeRest}>Short rest</BlueButton>
                  </PotionDiv>
                  <PotionDiv>
                    <BlueButton id="longRest" type="button" onClick={takeRest}>Long rest</BlueButton>
                  </PotionDiv>
                </PotionWrap>
              </PotsAndRests>
              <InfoDiv>
                <SpellCaster castFunc={castSpell} />
              </InfoDiv>
              <ButtonsDiv>
                <CharButtons type="button" onClick={openDelete}>Delete</CharButtons>
                <CharButtons type="button" onClick={openUpdate}>Edit</CharButtons>
              </ButtonsDiv>
              {deleteError && (
              <DeleteMessage error={deleteError} data={deleteData} />
              )}
              {upsertError && (
              <>
                <div>Error updating {char.name} please try again!</div>
              </>
              )}
            </CharWrapper>
          </>
          )}
          <DeletePopup
            showing={showDelete}
            name={char.name}
            closeFunc={closeDelete}
            deleteFunc={deleteChar}
          />
          <UpdatePopup
            showing={showUpdate}
            closeFunc={closeUpdate}
            character={char}
            updateFunc={updateChar}
            userId={session.user.id}
          />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;
  let initialCharacter = null;
  let userId = null;
  if (session) {
    userId = session.user.id;
    const client = initializeApollo();
    const result = await GET_CHARACTER(id, client);
    initialCharacter = result.data.character;
  }
  return {
    props:
    { initialCharacter, userId },
  };
}

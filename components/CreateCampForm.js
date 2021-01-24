import React, { useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { WhiteButton } from '../styles/index.styles';

export default function CreateCampForm({
  name,
  manaPotValue,
  greaterPotValue,
  cantripCost,
  spell1Cost,
  spell2Cost,
  spell3Cost,
  spell4Cost,
  spell5Cost,
  spell6Cost,
  spell7Cost,
  spell8Cost,
  spell9Cost,
  upsertFunc,
  userId,
}) {
  const values = {
    name: name || '',
    manaPotValue: manaPotValue || 0,
    greaterPotValue: greaterPotValue || 0,
    cantripCost: cantripCost || 0,
    spell1Cost: spell1Cost || 0,
    spell2Cost: spell2Cost || 0,
    spell3Cost: spell3Cost || 0,
    spell4Cost: spell4Cost || 0,
    spell5Cost: spell5Cost || 0,
    spell6Cost: spell6Cost || 0,
    spell7Cost: spell7Cost || 0,
    spell8Cost: spell8Cost || 0,
    spell9Cost: spell9Cost || 0,
  };

  const [campaignValues, setCampaignValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }), values,
  );

  function handleFormChange(event) {
    const { id, value, type } = event.target;
    if (type === 'number') {
      setCampaignValues({ [id]: +value });
      return;
    }
    setCampaignValues({ [id]: value });
  }

  async function createCampaign(event) {
    console.log('test');
    event.preventDefault();
    const insert = campaignValues;
    insert.user_id = userId;
    const result = await upsertFunc({ variables: insert });
    if (result) {
      console.log('Campaign created!');
    }
  }

  return (
    <>
      <Form id="camp-create" onSubmit={createCampaign} onChange={handleFormChange}>
        <Form.Group as={Row}>
          <Form.Label as={Col} htmlFor="name">
            Name <span>*</span>:
            <Form.Control id="name" type="text" required />
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as={Col} htmlFor="manaPotValue">
            Mana potion restore value:
            <Form.Control id="manaPotValue" type="number" min="0" />
          </Form.Label>
          <Form.Label as={Col} htmlFor="greaterPotValue">
            Greater mana potion restore value:
            <Form.Control id="greaterPotValue" type="number" min="0" />
          </Form.Label>
        </Form.Group>
        <Row>Spell costs:</Row>
        <Form.Group as={Row}>
          <Form.Label as={Col} htmlFor="cantripCost">
            Cantrip:
            <Form.Control id="cantripCost" type="number" min="0" />
          </Form.Label>
          <Form.Label as={Col} htmlFor="spell1Cost">
            Level 1:
            <Form.Control id="spell1Cost" type="number" min="0" />
          </Form.Label>
          <Form.Label as={Col} htmlFor="spell2Cost">
            Level 2:
            <Form.Control id="spell2Cost" type="number" min="0" />
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as={Col} htmlFor="spell3Cost">
            Level 3:
            <Form.Control id="spell3Cost" type="number" min="0" />
          </Form.Label>
          <Form.Label as={Col} htmlFor="spell4Cost">
            Level 4:
            <Form.Control id="spell4Cost" type="number" min="0" />
          </Form.Label>
          <Form.Label as={Col} htmlFor="spell5Cost">
            Level 5:
            <Form.Control id="spell5Cost" type="number" min="0" />
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as={Col} htmlFor="spell6Cost">
            Level 6:
            <Form.Control id="spell6Cost" type="number" min="0" />
          </Form.Label>
          <Form.Label as={Col} htmlFor="spell7Cost">
            Level 7:
            <Form.Control id="spell7Cost" type="number" min="0" />
          </Form.Label>
          <Form.Label as={Col} htmlFor="spell8Cost">
            Level 8:
            <Form.Control id="spell8Cost" type="number" min="0" />
          </Form.Label>
          <Form.Label as={Col} htmlFor="spell9Cost">
            Level 9:
            <Form.Control id="spell9Cost" type="number" min="0" />
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row}>
          <WhiteButton type="submit">Create!</WhiteButton>
        </Form.Group>
      </Form>
    </>
  );
}

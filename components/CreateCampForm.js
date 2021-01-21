import React, { useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CreateCampForm() {

  return (
    <>
      <Form id="camp-create">
        <Form.Group as={Row}>
          <Form.Label htmlFor="name">
            Name <span>*</span>:
            <Form.Control id="name" type="text" required />
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as={Col} htmlFor="manaPots">
            Mana potion restoration value:
            <Form.Control id="manaPots" type="number" min="0" />
          </Form.Label>
          <Form.Label as={Col} htmlFor="greaterPots">
            Greater mana potion restoration value:
            <Form.Control id="greaterPots" type="number" min="0" />
          </Form.Label>
        </Form.Group>
      </Form>
    </>
  );
}

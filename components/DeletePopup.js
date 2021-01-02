import React from 'react';
import ReactDOM from 'react-dom';
import { Overlay, Popup, DeleteButton } from '../styles/DeletePopup.styles';

export default function DeletePopup({
  deleteFunc, closeFunc, name, showing,
}) {
  async function delAndClose() {
    await deleteFunc();
    closeFunc();
  }

  if (!showing) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={closeFunc} />
      <Popup>
        Are you sure you want to delete {name}? <br />
        This action can&apos;t be undone.
        <div>
          <DeleteButton type="button" onClick={closeFunc}>No</DeleteButton>
          <DeleteButton type="button" onClick={delAndClose}>Yes</DeleteButton>
        </div>
      </Popup>
    </>,
    document.getElementById('portal'),
  );
}

import React, { useState } from 'react';
import { Modal } from './components/modal/Modal';

const EditProject = () => {
  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);

  return (
    <div>
      { show ? <div onClick={closeModalHandler} className="back-drop"></div> : null }
      <button onClick= {() => setShow(true)} className="btn-openModal">Edit project</button>
      <Modal show = {show} close = {closeModalHandler} />
    </div>
  );
}

export default EditProject;

import { useState } from "react";
import Modal from "./components/common/Modal";

import "./App.css";

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <img
        src="https://www.barkbusters.com/assets/Breed-Images/husky/Siberian-Husky-Breed-walking-in-snow__FocusFillMaxWyIwLjAyIiwiLTAuMTkiLDUwMCw1MDBd.jpg"
        alt=""
      />
      {modalVisible ? (
        <Modal
          onCloseModal={handleCloseModal}
          modalBG="rgba(0, 0, 0, 0.5)"
          modalCenterBG="rgba(255, 255, 255, 0.7)"
        >
          <h1>abcdasagasgsasahsdasdh</h1>
          <button onClick={handleCloseModal}>Close modal</button>
        </Modal>
      ) : null}
      <button onClick={handleShowModal}>Show modal</button>
    </>
  );
}

export default App;

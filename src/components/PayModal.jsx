import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import Button from './Button';
import Spinner from './Spinner';
import { clearCart } from '../slices/cartSlice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '600px',
    height: '400px',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
};

const ProgressText = styled.div`
  padding: 8px;
  opacity: 0.7;
  border-bottom: 1px solid rgb(204, 204, 204);
`;

const Container = styled.div`
  display: flex;
  padding: 15px;
  cursor: pointer;
  flex-direction: column;
  flex-grow: 1; 
`;

const BoughtItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const SuccessText = styled.h3`
  margin-top: auto;
`;
Modal.setAppElement('#root');

const PayModal = ({
  modalIsOpen,
  closeModal,
  cart,
  ...props
}) => {
  const [isPayed, setIsPayed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPayed(true);
    }, 3000);
  }, []);
  const onRequestClose = () => {
    if (isPayed) {
      props.clearCart();
      closeModal();
    }
  };
  return (
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      style={customStyles}
    >

      <ProgressText>Прогресс оплаты  </ProgressText>
      <hr />
      {isPayed ? (
        <Container>
          {cart.map((item) => (
            <BoughtItem key={item.id}>
              <div>{item.title}({item.quantity} шт.)</div>
              <div>Сумма товара: {(item.price * item.quantity).toFixed(2)}</div>
            </BoughtItem>
          ))}
          <SuccessText>Оплата прошла успешно</SuccessText>
          {/* <Button onClick={closeModal}><b>Закрыть</b></Button> */}

        </Container>
      ) : <Spinner />}

    </Modal>
  );
};

PayModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  clearCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  })).isRequired,
};

const mapStateToProps = (state) => ({ cart: state.cart });

const mapDispatchToProps = { clearCart };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PayModal);

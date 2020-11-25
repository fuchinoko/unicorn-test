import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createSelector } from '@reduxjs/toolkit';
import Tippy from '@tippyjs/react';
import { changeQuantity, removeItem } from '../slices/cartSlice';
import NumberInput from './NumberInput';
import Button from './Button';
import PayModal from './PayModal';
import { ReactComponent as Cross } from '../assets/cross.svg';

const Container = styled.div`
  border-radius: 3px;
  border: 1px solid black;
  min-width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  cursor: pointer;
`;

const CartModal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  height: 100%;
  width: 100%;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;  
  margin-top: 10px;

  &:nth-last-child(2) {
    margin-bottom: 10px;
  }
`;

const Bottom = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between; 
  align-items: center;  
  margin-bottom: 10px;
`;

const CrossContainer = styled.div`
  cursor: pointer;
`;

const NoItemsText = styled.h2`
  text-align: center;
  margin-top: 10px;
`;

const Tooltip = styled(Tippy)`
  background: white ;
  min-width: 400px;
  display: flex;
  border: 1px solid #000;
  border-radius: 5px;
  overflow-y: auto ;
  height: 300px;

  .tippy-content {
    width: 100%;
    display: flex;
    & > div {
      display: flex;
      flex-grow: 1;
    }
  }
`;

const QuantityInput = styled(NumberInput)`
  margin-left: auto;
  margin-right: 20px;
`;

const Cart = ({
  totalPrice,
  totalQuantity,
  cart,
  ...props
}) => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openCart = () => {
    setCartIsOpen(true);
  };
  const closeCart = () => {
    setCartIsOpen(false);
  };

  const openModal = () => {
    closeCart();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const total = ` Сумма: ${+totalPrice.toFixed(2)}$;  Всего: ${totalQuantity} шт.`;

  return (
    <>
      <Tooltip
        interactive
        theme="light"
        visible={cartIsOpen}
        onClickOutside={closeCart}
        content={(
          <CartModal>
            {cart.length ? cart.map((item) => (
              <CartItem key={item.id}>
                <div>{item.title}</div>
                <QuantityInput
                  value={item.quantity}
                  onChange={(quantity) => props.changeQuantity({ id: item.id, quantity })}
                  max={item.max}
                />
                <CrossContainer onClick={() => props.removeItem(item.id)}><Cross /></CrossContainer>
              </CartItem>
            )) : <NoItemsText>Нет товаров</NoItemsText>}
            <Bottom>
              <div>{total}</div>
              <Button onClick={openModal} disabled={!cart.length}><b>Оплатить</b> </Button>
            </Bottom>
          </CartModal>
        )}
      >
        <Container onClick={cartIsOpen ? closeCart : openCart}>
          <h3>Корзина</h3>
          <div>{total}</div>
        </Container>
      </Tooltip>
      {modalIsOpen ? <PayModal {...{ closeModal, modalIsOpen }} /> : ''}
    </>

  );
};

Cart.propTypes = {
  totalPrice: PropTypes.number,
  totalQuantity: PropTypes.number,
  changeQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })),
};

Cart.defaultProps = {
  totalPrice: 0,
  totalQuantity: 0,
  cart: [],
};

const getTotal = createSelector(
  [(state) => state.cart],
  (cart) => {
    const totalPrice = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    const totalQuantity = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    return {
      totalPrice,
      totalQuantity,
      cart,
    };
  },
);

const mapStateToProps = (state) => getTotal(state);

const mapDispatchToProps = { changeQuantity, removeItem };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);

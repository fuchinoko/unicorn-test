import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createSelector } from '@reduxjs/toolkit';

import Button from '../components/Button';
import NumberInput from '../components/NumberInput';
import items from '../data/items.json';
import { addItem } from '../slices/cartSlice';

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
`;

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80px;
`;

const Item = ({ currentItem, ...props }) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const {
    title,
    price,
    quantity,
  } = currentItem;

  const buyItem = () => {
    props.addItem({ ...currentItem, quantity: +itemQuantity });
    setItemQuantity(0);
  };

  return (
    <Container>
      <HeaderBlock>
        <Side>
          <h3>{title}</h3>
          <div>Цена: {price}$</div>
          <div>Количество: {quantity} шт.</div>
        </Side>
        <Side>
          <NumberInput
            value={+itemQuantity}
            min={0}
            max={quantity}
            onChange={setItemQuantity}
          />
          <Button
            disabled={quantity === 0 || itemQuantity === 0 || quantity < itemQuantity}
            onClick={buyItem}
          >
            <b>Купить</b>
          </Button>
        </Side>
      </HeaderBlock>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Sit odio placeat non at ad beatae culpa!
        Accusamus repellat quas dolorum harum eveniet deleniti
        laborum omnis aliquid! Vitae odio doloribus ducimus?
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Sit odio placeat non at ad beatae culpa!
        Accusamus repellat quas dolorum harum eveniet deleniti
        laborum omnis aliquid! Vitae odio doloribus ducimus?
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Sit odio placeat non at ad beatae culpa!
        Accusamus repellat quas dolorum harum eveniet deleniti
        laborum omnis aliquid! Vitae odio doloribus ducimus?
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Sit odio placeat non at ad beatae culpa!
        Accusamus repellat quas dolorum harum eveniet deleniti
        laborum omnis aliquid! Vitae odio doloribus ducimus?
      </div>
    </Container>
  );
};

Item.propTypes = {
  currentItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  addItem: PropTypes.func.isRequired,
};

const selectItem = (state, props) => {
  const { itemId } = props.match.params;
  const currentItem = items.find((item) => item.id === +itemId);
  const cartItem = state.cart.find((item) => item.id === +itemId);
  const cartItemQuantity = cartItem ? +cartItem.quantity : 0;
  return {
    ...currentItem,
    quantity: +currentItem.quantity - cartItemQuantity,
    max: currentItem.quantity,
  };
};

const getCurrentItem = createSelector(
  [selectItem],
  (item) => item,
);

const mapStateToProps = (state, props) => ({
  currentItem: getCurrentItem(state, props),
});

const mapDispatchToProps = { addItem };

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item));

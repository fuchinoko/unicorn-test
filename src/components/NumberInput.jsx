import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.input`
  border-radius: 3px;
  border: 1px solid #000;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  width: 60px;
`;
const NumberInput = ({ onChange, max, ...props }) => (
  <Container
    {...props}
    max={max}
    type="number"
    onChange={(e) => {
      if (e.target.value > max) {
        return;
      }
      onChange(+e.target.value);
    }}
  />
);

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default NumberInput;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.button`
  border-radius: 3px;
  border: none;
  justify-content: center;
  align-items: center;
  background: #008cff;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const Button = ({ onClick, children, disabled }) => (
  <Container onClick={onClick} disabled={disabled}>{children}</Container>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;

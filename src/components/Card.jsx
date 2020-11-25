import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { getCardLink } from '../utils';

const Container = styled.div`
  border-radius: 3px;
  border: 1px solid black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;
const Card = ({ title, id, location: { pathname } }) => (
  <Link to={getCardLink(pathname, id)}><Container>{title}</Container></Link>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Card);

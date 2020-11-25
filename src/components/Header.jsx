import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getHeaderTitle, getLinks } from '../utils';

import Cart from './Cart';

const Container = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const Side = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const Header = ({ location: { pathname } }) => (
  <Container>
    <Side>
      <h1>{getHeaderTitle(pathname)}</h1>
      <div>{pathname === '/' ? ''
        : getLinks(pathname)
          .map((item, i) => <Link key={i} to={item.to}> {item.title} / </Link>)}
      </div>
    </Side>

    <Cart />
  </Container>
);

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Header);

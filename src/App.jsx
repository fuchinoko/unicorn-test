import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import Categories from './pages/Categories';
import Items from './pages/Items';
import Item from './pages/Item';

const Container = styled.div`
    width: 100%;
`;

export default function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Switch>
          <Route exact path="/">
            <Categories />
          </Route>
          <Route exact path="/:categoryId">
            <Items />
          </Route>
          <Route path="/:categoryId/:itemId">
            <Item />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

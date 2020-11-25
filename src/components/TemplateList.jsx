import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './Card';
import { getCardSize } from '../utils';

const Grid = styled.div`
    display: grid;
    grid-auto-rows: ${(props) => props.cardSize};
    grid-template-columns: repeat(auto-fill,${(props) => props.cardSize});
    gap: 20px;
    margin: 20px;
`;

const TemplateList = ({ list, type }) => (
  <Grid cardSize={getCardSize(type)}>
    {list.map((item) => <Card key={item.id} title={item.title} id={item.id} />)}
  </Grid>
);

TemplateList.propTypes = {
  type: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })),
};

TemplateList.defaultProps = {
  type: 'categories',
  list: [],
};
export default TemplateList;

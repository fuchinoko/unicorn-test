import React from 'react';
import { useParams } from 'react-router-dom';

import TemplateList from '../components/TemplateList';
import items from '../data/items.json';

const Categories = () => {
  const { categoryId } = useParams();
  const list = items.filter((item) => item.category_id === +categoryId);
  return (
    <TemplateList list={list} type="items" />
  );
};

export default Categories;

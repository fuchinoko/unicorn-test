import React from 'react';
import TemplateList from '../components/TemplateList';
import categories from '../data/categories.json';

const Categories = () => (
  <TemplateList list={categories} />
);

export default Categories;

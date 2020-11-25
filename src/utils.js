import categories from './data/categories.json';
import items from './data/items.json';

export const getCardSize = (type) => {
  switch (type) {
    case 'categories':
      return '300px';
    case 'items':
      return '200px';

    default:
      return '300px';
  }
};

export const getCardLink = (pathname, id) => `${pathname}${pathname === '/' ? id : `/${id}`}`;

export const getHeaderTitle = (pathname) => {
  if (pathname === '/') {
    return 'Категории';
  }

  const nestLevel = pathname.split('/').length;
  switch (nestLevel) {
    case 2:
      return 'Товары';
    case 3:
      return 'Товар';
    default:
      return '';
  }
};

export const getLinks = (pathname) => {
  const res = [
    { title: 'Главная', to: '/' },
  ];
  const splitted = pathname.split('/');
  const nestLevel = splitted.length;

  const category = categories.find((i) => i.id === +splitted[1]) || {};
  res.push({ title: category.title, to: `/${category.id}` });

  if (nestLevel === 3) {
    const item = items.find((i) => i.id === +splitted[2]) || {};
    res.push({ title: item.title, to: `/${item.category_id}/${item.id}` });
  }

  return res;
};

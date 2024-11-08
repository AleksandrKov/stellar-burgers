import { TConstructorIngredient, TIngredient } from '@utils-types';

export const userRegistratedTest = {
  email: 'testEmail@yandex.ru',
  password: 'Qwerty7',
  name: 'Вася'
};

export const userLoginTest = {
  email: 'testEmail@yandex.ru',
  password: 'Qwerty7'
};

export const ingredientsTest = [
  {
    _id: '1',
    name: 'Булочка',
    type: 'bun',
    proteins: 85,
    fat: 26,
    carbohydrates: 44,
    calories: 643,
    price: 20,
    image: 'src',
    image_mobile: 'src',
    image_large: 'src'
  },
  {
    _id: '2',
    name: 'Соус',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'src',
    image_mobile: 'src',
    image_large: 'src'
  },
  {
    _id: '3',
    name: 'Котлета',
    type: 'main',
    proteins: 12.2,
    fat: 17.2,
    carbohydrates: 10.2,
    calories: 244.4,
    price: 300,
    image: 'src',
    image_mobile: 'src',
    image_large: 'src'
  }
];

export const ordersTodayTest = {
  orders: [
    {
      _id: '1',
      status: '',
      name: 'order',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    },
    {
      _id: '2',
      status: '',
      name: 'order',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    }
  ],
  total: 120,
  totalToday: 2,
  success: true
};

export const orderIngredientsTest = ['булочка', 'соус', 'котлета', 'булочка'];

export const orderTest = {
  success: true,
  order: {
    _id: '1',
    status: '',
    name: 'order',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: orderIngredientsTest
  },
  name: 'order'
};

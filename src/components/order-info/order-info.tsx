import { FC, useMemo, useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors/stellarBurgerDataSelector';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const number = Number(useParams().number);
  const ingredientSelecot = useAppSelector(selectIngredients);
  const [orderData, setOrderData] = useState({
    createdAt: '',
    ingredients: [''],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  });

  const ingredients: TIngredient[] = [
    ...ingredientSelecot.bun,
    ...ingredientSelecot.main,
    ...ingredientSelecot.sauce
  ];

  useEffect(() => {
    getOrderByNumberApi(number).then((data) => setOrderData(data.orders[0]));
  }, []);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};

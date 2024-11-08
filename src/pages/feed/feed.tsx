import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrders } from '../../services/slices/stellarBurgerDataSlice';
import {
  selectOrders,
  selectIsLoading
} from '../../services/selectors/stellarBurgerDataSelector';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Feed: FC = () => {
  const orderSelector = useAppSelector(selectOrders);
  const orders: TOrder[] = orderSelector.orders;
  const isLoading = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders.length) {
    return <Preloader />;
  }

  const getFeeds = () => {
    dispatch(getOrders());
  };

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};

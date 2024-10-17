import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearConstructorState } from '../../services/slices/burgerConstructorSlice';
import { constructorStateSelector } from '../../services/selectors/burgerConstructorSelector';
import { useNavigate } from 'react-router-dom';
import { clearOrderState, makeAnOrder } from '../../services/slices/orderSlice';
import {
  selectOrders,
  selectRequest
} from '../../services/selectors/orderSelector';
import { selectUser } from '../../services/selectors/authUserSelector';
import { useEffect } from 'react';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(constructorStateSelector);
  const user = useSelector(selectUser);
  const orderRequest = useSelector(selectRequest);
  const orderModalData = useSelector(selectOrders);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(
      makeAnOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id),
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    navigate('/');
    dispatch(clearConstructorState());
    dispatch(clearOrderState());
  };
  useEffect(() => {
    if (orderModalData && !orderRequest) {
      dispatch(clearConstructorState());
    }
  }, [orderModalData, orderRequest, dispatch]);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

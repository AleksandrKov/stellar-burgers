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

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(constructorStateSelector);
  const request = useSelector(selectRequest);
  const order = useSelector(selectOrders);
  const user = useSelector(selectUser);
  const orderRequest = request;
  const orderModalData = order;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) navigate('/login');
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

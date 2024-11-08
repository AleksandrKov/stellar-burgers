import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch } from '../../services/store';
import {
  rebuildOrder,
  removeFromConstructor
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveDown = () => {
      const from = index;
      const to = index + 1;
      dispatch(rebuildOrder({ from, to }));
    };

    const handleMoveUp = () => {
      const from = index;
      const to = index - 1;
      dispatch(rebuildOrder({ from, to }));
    };

    const handleClose = () => {
      dispatch(removeFromConstructor(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);

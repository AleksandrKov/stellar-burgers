import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { TDataState } from '../../services/slices/stellarBurgerDataSlice';
import { selectIngredients } from '../../services/selectors/stellarBurgerDataSelector';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useAppSelector(selectIngredients);
  const ingredientData = findIngredientById(id!, ingredients);

  function findIngredientById(
    id: string,
    ingredients: TDataState['ingredients']
  ) {
    const { bun, sauce, main } = ingredients;
    return (
      bun.find((item) => item._id === id) ||
      sauce.find((item) => item._id === id) ||
      main.find((item) => item._id === id)
    );
  }

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

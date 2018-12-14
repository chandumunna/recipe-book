import { Ingredient } from './ingredient';

export interface Recipe {
  title: string;
  description: string;
  dificulty: string;
  ingredients: Ingredient[];
}

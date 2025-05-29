import { Schema, Document, models, model } from 'mongoose';

export interface IRecipe extends Document {
  name: string;
  ingredients: string[];
  steps: string[];
  calories: number;
  sugar: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  rating: number;
  like: number;
  authorId: string;
}

const RecipeSchema = new Schema<IRecipe>({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  calories: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
  carbohydrates: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  rating: { type: Number, default: 2.5 },
  like: { type: Number, default: 0 },
  authorId: { type: String, required: true },
});

export default models.Recipe || model<IRecipe>('Recipe', RecipeSchema);

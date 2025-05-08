import { Schema, Document, models, model } from 'mongoose';

export interface IRecipe extends Document {
  name: string;
  ingredients: string[];
  steps: string[];
  calories: number;
  rating: number;
  like: number;
}

const RecipeSchema = new Schema<IRecipe>({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  calories: { type: Number, default: 0 },
  rating: { type: Number, default: 2.5 },
  like: { type: Number, default: 0 },
});

export default models.Recipe || model<IRecipe>('Recipe', RecipeSchema);


import { Schema, Document, models, model } from 'mongoose';

export interface IIngredient extends Document {
  name: string;
  unit: string;
  quantity: number;
}

const IngredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export default models.Ingredient || model<IIngredient>('Ingredient', IngredientSchema);
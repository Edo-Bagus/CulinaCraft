// models/Users.ts
import { Schema, models, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define User Interface (TypeScript)
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  favoriteRecipes: Types.ObjectId[]; // Tambahan: daftar resep favorit
}

// Create the User Schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Tambahan: daftar resep favorit (referensi ke koleksi Recipe)
    favoriteRecipes: [{
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
    }],
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) return next();

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next();
  }
});

// Compare entered password with hashed password
userSchema.methods.isPasswordMatch = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
export default models.User || model<IUser>('User', userSchema);
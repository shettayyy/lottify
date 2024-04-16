import { customAlphabet } from 'nanoid';

// Define a custom alphabet for nanoid generation
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// Create a custom nanoid generator using the provided alphabet
const generateID = customAlphabet(alphabet, 10);

// Generate a unique ID with datetime prefix
export const generateUniqueID = () => {
  const datetimePrefix = new Date().toISOString().replace(/\D/g, '');
  return datetimePrefix + generateID();
}; // Output will be something like: "20220412123456789abc"

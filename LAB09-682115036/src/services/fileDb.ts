import fs from 'fs';
import path from 'path';
import { Book } from '../models/Book';

const dataFile = path.join(__dirname, '../../books.json');

export const readBooks = (): Book[] => {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeBooks = (books: Book[]): void => {
  fs.writeFileSync(dataFile, JSON.stringify(books, null, 2), 'utf-8');
};

export const addBook = (book: Book): void => {
  const books = readBooks();
  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  const newBook = { ...book, id: newId };
  
  books.push(newBook);
  writeBooks(books);
};

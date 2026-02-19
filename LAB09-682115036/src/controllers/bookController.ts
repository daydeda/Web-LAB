import { Request, Response } from 'express';
import * as fileDb from '../services/fileDb';
import { Book } from '../models/Book';

export const home = (req: Request, res: Response) => {
  res.render('home');
};

export const listBooks = (req: Request, res: Response) => {
  const books = fileDb.readBooks();
  res.render('list', { books });
};

export const searchBooks = (req: Request, res: Response) => {
  const query = req.query.name as string;
  const books = fileDb.readBooks();
  
  if (query) {
    const filteredBooks = books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    res.render('list', { books: filteredBooks, searchQuery: query });
  } else {
    res.render('list', { books });
  }
};

export const addBook = (req: Request, res: Response) => {
  const { title, author, price } = req.body;
  
  if (!title || !author || !price) {
     return res.redirect('/books');
  }

  const newBook: Book = {
      id: 0,
      title,
      author,
      price: parseFloat(price)
  };

  fileDb.addBook(newBook);
  res.redirect('/books');
};

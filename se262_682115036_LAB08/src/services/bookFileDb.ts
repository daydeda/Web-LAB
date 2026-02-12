import fs from "fs";
import path from "path";

export type Book = {
  bookNo: number;
  bookName: string;
};

type DbShape = { books: Book[] };

const dbPath = path.join(process.cwd(), "data", "books.json");

// TODO 1: Implement readDb(): DbShape
// - If file not found: create data folder + books.json with { books: [] }
// - Read file text (utf-8) and JSON.parse
function readDb(): DbShape {
  // TODO 1
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify({ books: [] }, null, 2), "utf-8");
  }
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

// TODO 2: Implement writeDb(db: DbShape)
// - JSON.stringify(db, null, 2) and writeFileSync utf-8
function writeDb(db: DbShape) {
  // TODO 2
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8"); 
}

export function readBooks(): Book[] {
  // TODO 3: return readDb().books
  return readDb().books; // TODO 3
}

export function addBook(bookName: string): Book {
  // TODO 4:
  // - read db
  // - find max bookNo
  // - create newBook { bookNo: max+1, bookName }
  // - push, write db
  // - return newBook
  const db = readDb();
  const maxBookNo = db.books.length > 0 ? Math.max(...db.books.map((b) => b.bookNo)) : 0;
  const newBook = { bookNo: maxBookNo + 1, bookName };
  db.books.push(newBook);
  writeDb(db);
  return newBook; // TODO 4
}

export function deleteBook(bookNo: number): boolean {
  const db = readDb();
  const initialLength = db.books.length;
  db.books = db.books.filter((b) => b.bookNo !== bookNo);
  if (db.books.length < initialLength) {
    writeDb(db);
    return true;
  }
  return false;
}

export function searchBooks(query: string): Book[] {
  const db = readDb();
  return db.books.filter((b) => 
    b.bookName.toLowerCase().includes(query.toLowerCase()) || 
    b.bookNo.toString() === query
  );
}

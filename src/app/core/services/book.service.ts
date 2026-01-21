import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly STORAGE_KEY = 'library_books';
  private readonly DATA_URL = 'assets/data/books.json';

  constructor(private http: HttpClient) {}

  /**
   * Get all books
   * Priority:
   * 1. localStorage (if exists)
   * 2. static JSON file (assets)
   */
  getBooks(): Observable<Book[]> {
    const storedBooks = localStorage.getItem(this.STORAGE_KEY);

    if (storedBooks) {
      return of(JSON.parse(storedBooks));
    }

    return this.http.get<Book[]>(this.DATA_URL).pipe(
      map(books => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
        return books;
      })
    );
  }

  /**
   * Get a single book by ID
   */
  getBookById(id: number): Observable<Book | undefined> {
    return this.getBooks().pipe(
      map(books => books.find(book => book.id === id))
    );
  }

  /**
   * Borrow a book
   */
  borrowBook(bookId: number): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => {
        const updatedBooks = books.map(book =>
          book.id === bookId ? { ...book, available: false } : book
        );

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBooks));
        return updatedBooks;
      })
    );
  }

  /**
   * Return a book
   */
  returnBook(bookId: number): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => {
        const updatedBooks = books.map(book =>
          book.id === bookId ? { ...book, available: true } : book
        );

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBooks));
        return updatedBooks;
      })
    );
  }

  /**
   * Reset data from JSON file (optional utility)
   */
  resetBooks(): Observable<Book[]> {
    localStorage.removeItem(this.STORAGE_KEY);
    return this.http.get<Book[]>(this.DATA_URL).pipe(
      map(books => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
        return books;
      })
    );
  }
}

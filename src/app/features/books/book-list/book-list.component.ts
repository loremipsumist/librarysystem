import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Book } from '../../../core/models/book.model';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  displayedColumns: string[] = [
    'title',
    'author',
    'category',
    'availableCopies',
    'actions'
  ];

  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.dataSource.data = books;
      this.dataSource.paginator = this.paginator;
    });
  }

  borrowBook(book: Book): void {
    if (book.availableCopies > 0) {
      this.bookService.borrowBook(book);
      this.snackBar.open('Book borrowed successfully', 'Close', {
        duration: 2000
      });
    } else {
      this.snackBar.open('No copies available', 'Close', {
        duration: 2000
      });
    }
  }

  returnBook(book: Book): void {
    this.bookService.returnBook(book);
    this.snackBar.open('Book returned successfully', 'Close', {
      duration: 2000
    });
  }
}

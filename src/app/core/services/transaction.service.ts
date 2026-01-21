import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Transaction } from '../models/transaction.model';
import { Book } from '../models/book.model';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly transactionsUrl = 'assets/data/transactions.json';

  // In-memory transaction list (mock behavior)
  private transactions: Transaction[] = [];

  constructor(private http: HttpClient) {}

  /** Load all transactions from JSON */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsUrl);
  }

  /** Borrow a book */
  borrowBook(book: Book, member: Member): Transaction {
    const transaction: Transaction = {
      id: Date.now(),
      bookId: book.id,
      memberId: member.id,
      borrowDate: new Date(),
      status: 'BORROWED'
    };

    this.transactions.push(transaction);
    return transaction;
  }

  /** Return a book */
  returnBook(transaction: Transaction): Transaction {
    transaction.returnDate = new Date();
    transaction.status = 'RETURNED';
    return transaction;
  }

  /** Get active (borrowed) transactions */
  getActiveTransactions(): Transaction[] {
    return this.transactions.filter(t => t.status === 'BORROWED');
  }
}

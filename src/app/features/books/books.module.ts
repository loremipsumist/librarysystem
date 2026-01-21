import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookListComponent } from './book-list/book-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [BookListComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MaterialModule
  ]
})
export class BooksModule {}

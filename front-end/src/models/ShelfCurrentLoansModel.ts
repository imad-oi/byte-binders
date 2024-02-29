import BookModel from "./BookModel";

class ShelfCurrentLoansModel {
  book: BookModel;
  daysLeft: Date;

  constructor(book: BookModel, daysLeft: Date) {
    this.book = book;
    this.daysLeft = daysLeft;
  }
}

export default ShelfCurrentLoansModel;

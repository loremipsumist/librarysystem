export interface Transaction<T> {
  id: number;
  item: T;
  memberId: number;
  issueDate: Date;
  returnDate?: Date;
}

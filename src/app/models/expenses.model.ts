export class Expense {
  constructor(
    public name: string,
    public price: number,
    public category: string,
    public date: Date,
    public description?: string
  ) {}
}

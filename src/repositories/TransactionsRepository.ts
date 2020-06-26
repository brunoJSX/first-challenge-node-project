import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const amountIncome = this.transactions
      .filter(item => item.type === 'income')
      .map(item => item.value)
      .reduce((acumulador, currentValue) => acumulador + currentValue, 0);

    const amountOutcome = this.transactions
      .filter(item => item.type === 'outcome')
      .map(item => item.value)
      .reduce((acumulador, currentValue) => acumulador + currentValue, 0);

    const total = amountIncome - amountOutcome;

    return {
      income: amountIncome,
      outcome: amountOutcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

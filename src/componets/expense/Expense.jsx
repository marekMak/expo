import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import ExpenseCalculation from './ExpenseCalculation';

const Expense = ({
  addExpense,
  deleteExpense,
  itemsTotal,
  expensesTotal,
  expenses,
}) => {
  return (
    <div>
      <div className="flex w-full items-start justify-center">
        <ExpenseForm addExpense={addExpense} />
        <ExpenseCalculation
          itemsTotal={itemsTotal}
          expensesTotal={expensesTotal}
        />
      </div>
      <ExpenseList deleteExpense={deleteExpense} expenses={expenses} />
    </div>
  );
};

export default Expense;

import { useEffect, useState } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import ExpenseCalculation from './ExpenseCalculation';
import axios from 'axios';

import PocketBase from 'pocketbase';
import ExpenseEdit from './ExpenseEdit';
const pb = new PocketBase('http://127.0.0.1:8090');

function App() {
  const [expenses, setExpenses] = useState([]);

  const [itemsTotal, setTotalItems] = useState(0);
  const [expensesTotal, setTotalExpenses] = useState(0);

  useEffect(() => {
    const getExpensesAmount = async () => {
      try {
        const records = await pb.collection('expenses').getFullList();

        setTotalItems(records.reduce((sum, record) => sum + record.amount, 0));
        setTotalExpenses(
          records.reduce((sum, record) => sum + record.price * record.amount, 0)
        );
      } catch (e) {
        console.log(`Error fetching expenses: ${e}`);
      }
    };

    getExpensesAmount();
  }, [expenses]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8090/api/collections/expenses/records'
        );
        setExpenses(response.data.items);
      } catch (e) {
        console.log(`fetching error  ${e}`);
      }
    }
    fetchExpenses();
  }, []);

  async function addExpense(newExpense) {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8090/api/collections/expenses/records',
        newExpense
      );
      setExpenses((oldExpenses) => [...oldExpenses, response.data]);
    } catch (e) {
      console.log('Error adding expense', e);
    }
  }

  const deleteExpense = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8090/api/collections/expenses/records/${id}`
      );
      setExpenses((oldExpenses) =>
        oldExpenses.filter((expense) => expense.id !== id)
      );
    } catch (e) {
      console.log('Error adding expense', e);
    }
  };

  return (
    <main className="px-10 w-full min-h-screen py-5 font-amsterdam flex flex-col items-center justify-center">
      <div className="flex w-full items-start justify-center">
        <ExpenseForm addExpense={addExpense} />
        <ExpenseCalculation
          itemsTotal={itemsTotal}
          expensesTotal={expensesTotal}
        />
      </div>
      <ExpenseList deleteExpense={deleteExpense} expenses={expenses} />
    </main>
  );
}

export default App;

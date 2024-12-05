import { createContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          'http://localhost:8090/api/collections/expenses/records'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setExpenses(data.items);
      } catch (error) {
        console.error('Error fetching expenses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider value={{ expenses, loading }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import Logo from '/logoExpo.svg';

import ExpenseDetail from './componets/expense/ExpenseDetail';
import Expense from './componets/expense/Expense';
import axios from 'axios';
import Login from './componets/auth/Login';
import Register from './componets/auth/Register';
import PrivateRoute from './componets/auth/PrivateRoute';

import ExpenseEdit from './componets/expense/ExpenseEdit';
import { logout, pb } from './lib/pocketbase';

import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  const [expenses, setExpenses] = useState([]);

  const [itemsTotal, setTotalItems] = useState(0);
  const [expensesTotal, setTotalExpenses] = useState(0);
  const [user, setUser] = useState(pb.authStore.record);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setUser(model);

      if (!model) setExpenses([]);
    });
  }, []);

  async function checkAuth() {
    const isValid = pb.authStore.isValid;

    if (!isValid) logout();
  }

  useEffect(() => {
    checkAuth();
  }, []);

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
    <Router>
      <ExpenseProvider>
        <main className="px-10 w-full min-h-screen py-5 font-amsterdam flex flex-col items-center justify-center relative">
          <nav className="w-screen py-5 top-0 fixed flex justify-center text-2xl">
            <ul className="flex w-full items-center justify-around gap-6 text-slate-700 px-48">
              <NavLink
                className="text-bold hover:text-baseTeal transition-colors delay-150"
                to="/"
              >
                <img src={Logo} alt="expenses logo app" className="w-12 h-12" />
              </NavLink>
              {user ? (
                <li>
                  <button
                    className="btn btn-outline btn-accent hover:text-white"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <div className="flex gap-4">
                  <li>
                    <Link
                      className="text-bold text-baseTeal hover:text-baseGreen transition-colors delay-150"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-bold text-baseTeal hover:text-baseGreen transition-colors delay-150"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </nav>
          <Routes>
            <Route
              path="/logout"
              element={() => {
                logout();
                setUser(null);
                return <></>;
              }}
            />

            <Route
              path="/"
              element={
                <PrivateRoute user={user}>
                  <Expense
                    addExpense={addExpense}
                    itemsTotal={itemsTotal}
                    expensesTotal={expensesTotal}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute user={user}>
                  <ExpenseEdit />
                </PrivateRoute>
              }
            />
            <Route path="/expense/:id" element={<ExpenseDetail />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </ExpenseProvider>
    </Router>
  );
}

export default App;

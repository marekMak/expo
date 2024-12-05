import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ExpenseContext from '../../context/ExpenseContext';
import CurrencyFormat from '../../utils/CurrencyFormat';
import formatDate from '../../utils/formatDate';

import { Link } from 'react-router-dom';

import { MdOutlineDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

const ExpenseDetail = () => {
  const { id } = useParams();
  const { expenses, loading } = useContext(ExpenseContext);
  const expense = expenses.find((expense) => expense.id === id);

  if (loading) return <p>Loading expenses...</p>;
  if (!expenses) return <p>Expense not found...</p>;

  return (
    <div className="w-full min-h-36 flex items-center flex-col">
      <div className="flex justify-center items-center flex-col bg-base-100 w-fit shadow-xl py-10 px-20">
        <h2 className="text-2xl font-bold font-amsterdam mb-6 text-center text-baseTeal">
          Expense detail
        </h2>
        {expense && (
          <table className="table text-xl text-center">
            <thead className="text-xl">
              <tr>
                <th>item</th>
                <th>amount</th>
                <th>price</th>
                <th>status</th>
                <th>created</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td>
                  <CurrencyFormat price={expense.price} />
                </td>
                <td
                  className={`${expense.status == true ? 'text-yellow-400' : 'text-green-400'}`}
                >
                  {expense.status == true ? 'pending' : 'completed'}
                </td>
                <td>{formatDate(expense.created)}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-outline btn-warning leading-relaxed text-xl"
                    onClick={() => editExpense(expense.id)}
                  >
                    <CiEdit />
                  </button>

                  <button
                    className="btn btn-outline btn-error leading-relaxed text-xl"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <Link
        to="/"
        className="text-md font-bold text-baseTeal ml-2 text-xl delay-150 hover:text-baseGreen transition-colors mt-5"
      >
        Go back to expenses
      </Link>
    </div>
  );
};

export default ExpenseDetail;

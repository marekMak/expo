import CurrencyFormat from './componets/CurrencyFormat';
import Modal from './componets/Modal';
import ModalButton from './componets/ModalButton';
import axios from 'axios';

import { MdOutlineDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

import { useState } from 'react';
const ExpenseList = ({ deleteExpense, expenses }) => {
  const editExpense = (id) => {
    let editExpenseConfirm = confirm(
      'Are you sure you want to edit this expense ?'
    );
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setEditingExpense(expenseToEdit);
      openModal();
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="w-2/3 h-fit py-5 flex flex-col items-center justify-center">
      <h1 className="text-2xl mr-10 mb-6">Your list of expenses</h1>

      <table className="table text-xl text-center">
        <thead className="text-xl">
          <tr>
            <th>item</th>
            <th>amount</th>
            <th>price</th>
            <th>status</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="3">Lucky you, no expenses found!</td>
            </tr>
          ) : (
            expenses.map((expense, id) => (
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
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-outline btn-warning leading-relaxed text-xl"
                    onClick={() => editExpense(expense.id)}
                  >
                    <CiEdit />
                  </button>
                  <ModalButton onOpen={openModal} />
                  <button
                    className="btn btn-outline btn-error leading-relaxed text-xl"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Modal isOpen={isOpen} onClose={closeModal} />

      <Modal isOpen={isOpen} onClose={closeModal}>
        {editingExpense && (
          <div>
            <h2>Edit Expense</h2>
            {/* Zobrazenie formulára pre editáciu */}
            <form>
              <div>
                <label>Title</label>
                <input type="text" value={editingExpense.title} />
              </div>
              <div>
                <label>Amount</label>
                <input type="number" value={editingExpense.amount} />
              </div>
              <div>
                <label>Price</label>
                <input type="number" value={editingExpense.price} />
              </div>
              {/* Môžeš pridať ďalšie polia */}
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ExpenseList;

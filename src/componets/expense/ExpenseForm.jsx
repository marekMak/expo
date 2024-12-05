import { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    price: '',
    status: false,
  });

  const handleAddExpense = (e) => {
    e.preventDefault();
    addExpense(newExpense);
    setNewExpense({ title: '', amount: '', price: '', status: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-fit flex py-5 justify-center px-5">
      <form
        onSubmit={handleAddExpense}
        className="flex flex-col items-center rounded text-xl w-full max-w-lg"
      >
        <input
          type="text"
          name="title"
          value={newExpense.title}
          onChange={handleChange}
          placeholder="Enter expense title"
          className="my-2 input input-bordered w-full min-w-96"
        />
        <input
          type="number"
          name="amount"
          min={0}
          value={newExpense.amount}
          onChange={handleChange}
          placeholder="Enter expense amount"
          className="my-2 input input-bordered w-full min-w-96"
        />
        <input
          type="number"
          name="price"
          min={0}
          value={newExpense.price}
          onChange={handleChange}
          placeholder="Enter expense price"
          className="my-2 input input-bordered w-full min-w-96"
        />
        <select
          name="status"
          value={newExpense.status} // Hodnota bude zodpovedať stavu
          onChange={handleChange}
          className="my-2 input input-bordered w-full min-w-96"
        >
          <option value="">-</option>
          <option value={true}>Pending</option>
          <option value={false}>Completed</option>
        </select>
        <button
          type="submit"
          className="btn btn-outline btn-accent text-xl mt-2 w-full min-w-96"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;

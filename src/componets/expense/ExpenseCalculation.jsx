import { useEffect, useState } from 'react';
import CurrencyFormat from '../../utils/CurrencyFormat';

const ExpenseCalculation = ({ itemsTotal, expensesTotal }) => {
  return (
    <div className="w-1/3 h-fit py-5 flex flex-col items-center justify-center">
      <h1 className="text-xl">Total expenses</h1>

      <table className="table text-xl text-center">
        <thead className="text-xl">
          <tr>
            <th>Items in total</th>
            <th>Price in total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-yellow-400">{itemsTotal}</td>
            <td className="text-green-400">
              <CurrencyFormat price={expensesTotal} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseCalculation;

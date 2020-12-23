import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';


const ExpenseList= (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.length === 0 && <p>No expense existed.</p>}
        {
            props.expenses.map((expense, index) => (
                <ExpenseListItem key={expense.id} {...expense}/>
            ))
        }
    </div>
);

// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     };
// })(ExpenseList);

// export default ConnectedExpenseList;

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};
export default connect(mapStateToProps)(ExpenseList);




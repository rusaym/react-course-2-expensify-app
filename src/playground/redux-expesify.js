import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid';

// ADD_EXPENSE (Action generator)
const addExpense = (
    { 
        description ='', 
        note = '', 
        amount = 0, 
        createdAt = 0  
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id 
}) ;

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_FILTER_TEXT
const setTextFilter = (text = '') => ({
    type: 'SET_FILTER_TEXT',
    text
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

// SORT_BY_DATE

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

// SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
}); 

// SET_END_DATE

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});


// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action ) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];    // state.concat(action.expense);
        case 'REMOVE_EXPENSE':
            return  state.filter(({ id }) => (id != action.id)); // state.filter((exp) => (exp.id != action.id))           
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });

        default:
            return state;
    }
};



// Filters reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_FILTER_TEXT':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };    
        case 'SET_START_DATE':
                return {
                    ...state,
                    startDate: action.startDate
                };    
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };      
        default: 
            return state;
    }
};

// timestamps (milliseconds)
// January 1st 1970 (unix epoch)
// 33400, 10, -203


//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());    


        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1; 
        }
    });
};


// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'tent', amount: 100, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({ description: 'CoffeeRent', amount: 3, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 5 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//store.dispatch(setStartDate(2000));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1250));




const demoState = {
    expenses: [{
        id: 'dsfsdfwerwer',
        description: 'January rent',
        note: 'This is the final payment that address',
        amount: 2500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};


// const user = {
//     name: 'Alex',
//     age: 33
// };

// console.log({
//     ...user,
//     location: 'Tampa',
//     age: 22
// });


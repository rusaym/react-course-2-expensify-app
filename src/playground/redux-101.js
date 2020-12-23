import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
        type: 'INCREMENT',
        incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count  } = {}) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

//Reducers

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            //const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - action.decrementBy
            };    
        case 'SET':
                return {
                    count: action.count 
                };
    
        case 'RESET':
            return {
                count: 0
            };

        default:
            return state;            
        }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log('changed', store.getState());
});

store.dispatch(incrementCount({ incrementBy: 66 }));

store.dispatch(decrementCount({ decrementBy: 33 }));

store.dispatch(setCount({ count: 336 }));

store.dispatch(resetCount());

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });



//unsubscribe();

// store.dispatch({
//     type: 'DECREMENT'
// });

// store.dispatch({
//     type: 'DECREMENT'
// });

// store.dispatch({
//     type: 'DECREMENT'
// });

// store.dispatch({
//     type: 'RESET'
// });

// store.dispatch({
//     type: 'DECREMENT'
// });

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 100
// });

// store.dispatch({
//     type: 'SET',
//     count: 101
// });
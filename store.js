export default class Store {
    constructor(tallyReducer, initial) {
        this.tallyReducer = tallyReducer;
        this.state = initial;
        this.eventListeners = [];
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = this.tallyReducer(this.state, action);
        this.eventListeners.forEach(eventListener => eventListener());
    }

    subscribe(eventListener) {
        this.eventListeners.push(eventListener);
        return () => {
            this.eventListeners = this.eventListeners.filter(listener => listener !== eventListener);
        };
    }
}

// Action types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

// Action creators
const increaseAction = () => ({ type: INCREMENT });
const decreaseAction = () => ({ type: DECREMENT });
const resetAction = () => ({ type: RESET });

// Reducer function
const tallyReducer = (state = { tally: 0 }, action) => {
    switch (action.type) {
        case INCREMENT:
            return { tally: state.tally + 1 };
        case DECREMENT:
            return { tally: state.tally - 1 };
        case RESET:
            return { tally: 0 };
        default:
            return state;
    }
};

// Initial state
const initial = { tally: 0 };

// Create a store
const store = new Store(tallyReducer, initial);

export { store, increaseAction, decreaseAction, resetAction };
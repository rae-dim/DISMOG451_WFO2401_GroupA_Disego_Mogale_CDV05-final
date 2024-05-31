import { store, increaseAction, decreaseAction, resetAction } from './store.js';

// Counter display element
const counterDisplay = document.getElementById('counterDisplay');

const render = () => {
    counterDisplay.textContent = store.getState().tally;
}

store.subscribe(render);

// Adding functionality to buttons
document.getElementById('increment').addEventListener('click', () => {
    store.dispatch(increaseAction());
});

document.getElementById('decrement').addEventListener('click', () => {
    store.dispatch(decreaseAction());
});

document.getElementById('reset').addEventListener('click', () => {
    store.dispatch(resetAction());
});

// Initial render
render();
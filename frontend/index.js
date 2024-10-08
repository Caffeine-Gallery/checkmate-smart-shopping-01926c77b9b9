import { backend } from 'declarations/backend';

const form = document.getElementById('add-item-form');
const input = document.getElementById('new-item');
const list = document.getElementById('shopping-list');

async function loadItems() {
    const items = await backend.getItems();
    list.innerHTML = '';
    items.forEach(item => {
        const li = createListItem(item);
        list.appendChild(li);
    });
}

function createListItem(item) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${item.completed ? 'completed' : ''}">${item.text}</span>
        <div>
            <button class="toggle-btn ${item.completed ? 'completed' : ''}">
                <i class="fas fa-check"></i>
            </button>
            <button class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    const toggleBtn = li.querySelector('.toggle-btn');
    toggleBtn.addEventListener('click', async () => {
        await backend.updateItem(item.id, !item.completed);
        await loadItems();
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async () => {
        await backend.deleteItem(item.id);
        await loadItems();
    });

    return li;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        await backend.addItem(text);
        input.value = '';
        await loadItems();
    }
});

window.addEventListener('load', loadItems);

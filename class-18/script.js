// ===== DOM ELEMENTS =====
const addBtn = document.querySelector('.add-ticket-btn');
const modal = document.querySelector('.modal');
const modalInput = document.querySelector('.modal-input');
const ticketContainer = document.querySelector('.ticket-container');
const toolbox = document.querySelector('.toolbox');

// ===== STATE =====
let selectedColor = '#ff6b6b'; // Default to pink (first color)
let isModalOpen = false;
let ticketsArr = [
    { id: 'ticket-1', text: 'Buy groceries', color: '#ff6b6b', isLocked: false },
    { id: 'ticket-2', text: 'Finish homework', color: '#6bcbff', isLocked: false },
    { id: 'ticket-3', text: 'Call dentist', color: '#6bff9e', isLocked: false }
];
let ticketCounter = ticketsArr.length;
let activeColorBox = document.querySelector('.color-pink');

// ===== HELPERS =====
function generateId() {
    ticketCounter++;
    return 'ticket-' + ticketCounter;
}

function createTicket(taskText, color) {
    const id = generateId();

    // 1. Create the ticket container
    const ticket = document.createElement('div');
    ticket.classList.add('ticket');
    ticket.setAttribute('data-id', id);

    // 2. Create the color band
    const colorBand = document.createElement('div');
    colorBand.classList.add('ticket-color-band');
    colorBand.style.backgroundColor = color;

    // 3. Create the text area
    const text = document.createElement('div');
    text.classList.add('ticket-text');
    text.textContent = taskText;

    // 4. Create the lock icon
    const lock = document.createElement('div');
    lock.classList.add('ticket-lock');
    lock.innerHTML = '<i class="fa-solid fa-lock-open"></i>';

    // NEW: Remove button
    const removeBtn = document.createElement('div');
    removeBtn.classList.add('ticket-remove');
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    // 5. Assemble the ticket
    ticket.appendChild(colorBand);
    ticket.appendChild(text);
    ticket.appendChild(lock);
    ticket.appendChild(removeBtn);

    // 6. Add to the page
    ticketContainer.appendChild(ticket);

    return id;
}

// ===== MODAL TOGGLE =====
addBtn.addEventListener('click', function () {
    isModalOpen = !isModalOpen;

    if (isModalOpen) {
        modal.classList.remove('hidden');
        addBtn.textContent = '-';
    } else {
        modal.classList.add('hidden');
        addBtn.textContent = '+';
        modalInput.value = ''; // Clear input when modal closes
    }
});

// ===== MODAL INPUT HANDLING =====
modalInput.addEventListener('keydown', function (event) {
    if (event.key !== 'Enter') {
        return;
    }

    const taskText = modalInput.value.trim();

    if (taskText === '') {
        alert('Please, enter a task description.');
        return;
    }

    console.log('Task: ', taskText);
    console.log('Priority Color: ', selectedColor);

    // Create Ticket
    const id = createTicket(taskText, selectedColor);

    // Store ticket data in an array
    ticketsArr.push({
        id: id,
        text: taskText,
        color: selectedColor,
        islocked: false
    });

    // Clear input
    modalInput.value = '';
});

// ===== COLOR SELECTION (Event Delegation) =====
toolbox.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (!clickedElement.classList.contains('color-box')) {
        return; // Ignore clicks on non-color elements
    }

    // Remove active state from the previous selection
    activeColorBox.classList.remove('active');

    // Update selected color and active element
    selectedColor = clickedElement.dataset.color;
    activeColorBox = clickedElement;

    // Add active state to the new selection
    activeColorBox.classList.add('active');
});

// ===== TICKET REMOVAL =====
ticketContainer.addEventListener('click', function (event) {
    const clickedElement = event.target;
    const removeBtn = clickedElement.closest('.ticket-remove');

    if (!removeBtn) {
        return;
    }

    const ticket = removeBtn.closest('.ticket');
    const ticketId = ticket.getAttribute('data-id');

    ticketsArr = ticketsArr.filter(function (t) {
        return t.id !== ticketId;
    });

    ticket.remove();
});

// ===== INITIAL RENDER =====
activeColorBox.classList.add('active');

ticketsArr.forEach(function (ticket) {
    createTicket(ticket.text, ticket.color);
});

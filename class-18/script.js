// ===== DOM ELEMENTS =====
const addBtn = document.querySelector('.add-ticket-btn');
const modal = document.querySelector('.modal');
const modalInput = document.querySelector('.modal-input');
const ticketContainer = document.querySelector('.ticket-container');
const toolbox = document.querySelector('.toolbox');
const showAllBtn = document.querySelector(".show-all-btn");

// ===== STATE =====
let selectedColor = '#ff6b6b'; // Default to pink (first color)
let isModalOpen = false;
let ticketsArr = [];
let ticketCounter = ticketsArr.length;
let activeColorBox = document.querySelector('.color-pink');
const COLORS = ["#ff6b6b", "#6bcbff", "#6bff9e", "#ffb86b"];

// ===== HELPERS =====
function generateId() {
    ticketCounter++;
    return 'ticket-' + ticketCounter;
}

function createTicket(taskText, color) {
    const id = generateId();

    const ticketData = {
        id: id,
        text: taskText,
        color: color,
        islocked: false
    }

    ticketsArr.push(ticketData);
    renderTicket(ticketData);
    saveToLocalStorage();

    // // 1. Create the ticket container
    // const ticket = document.createElement('div');
    // ticket.classList.add('ticket');
    // ticket.setAttribute('data-id', id);

    // // 2. Create the color band
    // const colorBand = document.createElement('div');
    // colorBand.classList.add('ticket-color-band');
    // colorBand.style.backgroundColor = color;

    // // 3. Create the text area
    // const text = document.createElement('div');
    // text.classList.add('ticket-text');
    // text.textContent = taskText;
    // text.setAttribute('contenteditable', 'true');

    // // 4. Create the lock icon
    // const lock = document.createElement('div');
    // lock.classList.add('ticket-lock');
    // lock.innerHTML = '<i class="fa-solid fa-lock-open"></i>';

    // // NEW: Remove button
    // const removeBtn = document.createElement('div');
    // removeBtn.classList.add('ticket-remove');
    // removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    // // 5. Assemble the ticket
    // ticket.appendChild(colorBand);
    // ticket.appendChild(text);
    // ticket.appendChild(lock);
    // ticket.appendChild(removeBtn);

    // // 6. Add to the page
    // ticketContainer.appendChild(ticket);

    // return id;
}

// ===== RENDER TICKET (from data object) =====
function renderTicket(ticketData) {
    let ticket = document.createElement('div');
    ticket.classList.add('ticket');
    ticket.setAttribute('data-id', ticketData.id);
    let colorBand = document.createElement('div');
    colorBand.classList.add('ticket-color-band');
    colorBand.style.backgroundColor = ticketData.color;

    let text = document.createElement('div');
    text.classList.add('ticket-text');
    text.textContent = ticketData.text;

    // Set contentEditable based on lock state
    if (ticketData.islocked) {
        text.setAttribute('contenteditable', 'false');
    } else {
        text.setAttribute('contenteditable', 'true');
    }

    let lock = document.createElement('div');
    lock.classList.add('ticket-lock');
    if (ticketData.islocked) {
        lock.innerHTML = '<i class="fa-solid fa-lock"></i>';
    } else {
        lock.innerHTML = '<i class="fa-solid fa-lock-open"></i>';
    }

    let removeBtn = document.createElement('div');
    removeBtn.classList.add('ticket-remove');
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark></i>';

    ticket.appendChild(colorBand);
    ticket.appendChild(text);
    ticket.appendChild(lock);
    ticket.appendChild(removeBtn);
    ticketContainer.appendChild(ticket);
}

// ===== LOCAL STORAGE =====
function saveToLocalStorage() {
    localStorage.setItem('kanban-tickets', JSON.stringify(ticketsArr));
    localStorage.setItem('kanban-counter', ticketCounter.toString());
}

// ===== FILTERING ====
function filterTicketsByColor(color) {
    let allTickets = document.querySelectorAll(".ticket");
    allTickets.forEach(function (ticket) {
        let ticketId = ticket.getAttribute('data-id');
        let ticketData = ticketsArr.find(function(t) {
            return t.id === ticketId;
        });
        if (ticketData && ticketData.color === color) {
            ticket.style.display = 'flex';
        } else {
            ticket.style.display = 'none';
        }
    })
}

function showAllTickets() {
    let allTickets = document.querySelectorAll('.ticket');
    allTickets.forEach(function (ticket) {
        ticket.style.display = 'flex';
    })
}

// ===== COLOR SELECTION AND FILTERING (Event Delegation) =====

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

    // Create Ticket
    createTicket(taskText, selectedColor);

    // Clear input
    isModalOpen = false;
    modalInput.value = '';
    addBtn.textContent = "+";
    modal.classList.add('hidden');
    saveToLocalStorage();
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

    filterTicketsByColor(selectedColor);
});

showAllBtn.addEventListener('click', function() {
    showAllTickets();
});

// ===== TICKET ACTIONS (Event Delegation) =====
ticketContainer.addEventListener('click', function (event) {
    const clickedElement = event.target;

    // ----- Handle Remove -----
    const removeBtn = clickedElement.closest('.ticket-remove');

    if (removeBtn) {
        const ticket = removeBtn.closest('.ticket');
        const ticketId = ticket.getAttribute('data-id');

        ticketsArr = ticketsArr.filter(function (t) {
            return t.id !== ticketId;
        });

        ticket.remove();
        saveToLocalStorage();
        return; // Exist after handling remove
    }

    // ----- Handle Lock/Unlock -----
    const lockBtn = clickedElement.closest('.ticket-lock');
    if (lockBtn) {
        const ticket = lockBtn.closest('.ticket');
        const ticketId = ticket.getAttribute('data-id');
        const textElement = ticket.querySelector('.ticket-text');
        const icon = lockBtn.querySelector('i');

        // Find the ticket data
        const ticketData = ticketsArr.find(function(t) {
            return t.id === ticketId;
        });

        if (!ticketData) {
            return;
        }

        // Toggle the locked state
        ticketData.islocked = !ticketData.islocked;

        if (ticketData.islocked) {
            textElement.setAttribute('contenteditable', 'false');
            icon.classList.remove('fa-lock-open');
            icon.classList.add('fa-lock');
        } else {
            textElement.setAttribute('contenteditable', 'true');
            icon.classList.remove('fa-lock');
            icon.classList.add('fa-lock-open');
        }

        saveToLocalStorage();
        return;
    }

    // ===== Handle Color Cycling =====
    const colorBand = clickedElement.closest('.ticket-color-band');
    if (colorBand) {
        const ticket = colorBand.closest(".ticket");
        const ticketId = ticket.getAttribute('data-id');
        const ticketData = ticketsArr.find(function(t) {
            return t.id === ticketId;
        });

        if (!ticketData) {
            return;
        }

        // Find current color index
        const currentIndex = COLORS.indexOf(ticketData.color);
        // Calculate next color index with modulo
        const nextIndex = (currentIndex + 1) % COLORS.length;

        // Update data
        ticketData.color = COLORS[nextIndex];

        // Update DOM
        colorBand.style.backgroundColor = COLORS[nextIndex];

        saveToLocalStorage();
        return;
    }
});

// ===== TEXT EDITING (Sync data on blur) =====
ticketContainer.addEventListener('blur', function (event) {
    let editedElement = event.target;
    if (!editedElement.classList.contains('ticket-text')) {
        return;
    }

    let ticket = editedElement.closest('.ticket');
    let ticketId = ticket.getAttribute('data-id');
    let newText = editedElement.textContent.trim();

    // Update the data array
    let ticketData = ticketsArr.find(function (t) {
        return t.id === ticketId;
    });

    if (ticketData) {
        ticketData.text = newText;
        saveToLocalStorage();
    }
}, true); // 'true' enables capture phase for blur

// ===== INITIAL RENDER =====
activeColorBox.classList.add('active');

// ticketsArr.forEach(function (ticket) {
//     createTicket(ticket.text, ticket.color);
// });

function loadFromLocalStorage() {
    let savedTickets = localStorage.getItem("kanban-tickets");
    let savedCounter = localStorage.getItem("kanban-counter");
    if (savedTickets && savedCounter) {
        ticketsArr = JSON.parse(savedTickets);
        ticketCounter = parseInt(savedCounter, 10);
        ticketsArr.forEach(function(ticketData) {
            renderTicket(ticketData);
        });
    } else {
        ticketsArr = [];
        ticketCounter = 0;
    }

    filterTicketsByColor(selectedColor);
}

loadFromLocalStorage();
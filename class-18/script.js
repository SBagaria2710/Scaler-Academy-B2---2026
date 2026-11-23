const addBtn = document.querySelector(".add-ticket-btn");
const modal = document.querySelector(".modal");
const modalInput = document.querySelector(".modal-input");
const ticketContainer = document.querySelector(".ticket-container");
const toolbox = document.querySelector(".toolbox");

let selectedColor = "#ff6b6b"; // Default to pink (first color)

// ===== MODAL TOGGLE =====
let isModalOpen = false;

addBtn.addEventListener("click", function() {
    isModalOpen = !isModalOpen;

    if (isModalOpen) {
        modal.classList.remove('hidden');
        addBtn.textContent = '-';
    } else {
        modal.classList.add('hidden');
        addBtn.textContent = "+";
        modalInput.value = ''; // Clear input when modal closes
    }
});

// ===== MODAL INPUT HANDLING =====
modalInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        const taskText = modalInput.value.trim();

        if (taskText === '') {
            alert("Please, enter a task description.");
            return;
        }

        console.log("Task: ", taskText);
        console.log("Priority Color: ", selectedColor);

        // In Session 2, we will create a ticket here.

        modalInput.value = "";
    }
});

// ===== COLOR SELECTION (Event Delegation) =====
let activeColorBox = document.querySelector(".color-pink");
activeColorBox.classList.add('active');

toolbox.addEventListener("click", function (event) {
    const clickedElement = event.target;

    if (!clickedElement.classList.contains('color-box')) {
        return; // Guard Claude: ignore clicks on non-color elements
    }

    // Remove active state from the previous selection
    activeColorBox.classList.remove('active');

    // Update selected color and active element
    selectedColor = clickedElement.dataset.color;
    activeColorBox = clickedElement;

    // Add active state to the new selection
    activeColorBox.classList.add('active');
});
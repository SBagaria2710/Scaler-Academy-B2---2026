// Problem 1
// function convertTemp(temp, unit) {
//     if (unit === "C") {
//         const fahrenheit = (temp * 9 / 5) + 32;
//         return `${temp}C is ${fahrenheit}F`;
//     } else if (unit === "F") {
//         const celsius = (temp - 32) * 5 / 9;
//         return `${temp}F is ${celsius}C`;
//     } else {
//         throw new Error("Invalid unit");
//     }
// };

// console.log(convertTemp(100, "C"));
// console.log(convertTemp(32, "F"));
// console.log(convertTemp(0, "C"));

// -------
// Problem 2
// function reverseWords(sentence) {
//     const words = sentence.split(" ");
//     const reverseWords = [];

//     for (const word of words) {
//         let reversed = "";
//         for (let i = word.length - 1; i >= 0; i--) {
//             reversed = reversed + word[i];
//         }
//         reverseWords.push(reversed);
//     }

//     return reverseWords.join(" ");
// }


// console.log(reverseWords("hello world"));
// console.log(reverseWords("JavaScript is fun"));
// console.log(reverseWords("Scaler Academy Morning Batch"));


// --------
// Problem 3
// function categorizeStudents(students) {
//     const result = {
//         toppers: [],
//         average: [],
//         belowAverage: []
//     };

//     for (const student of students) {
//         if (student.score >= 80) {
//             result.toppers.push(student.name);
//         } else if (student.score >= 50) {
//             result.average.push(student.name);
//         } else {
//             result.belowAverage.push(student.name);
//         }
//     }

//     return result;
// }

// const students = [
//     { name: "Alice", score: 92 },
//     { name: "Bob", score: 65 },
//     { name: "Charlie", score: 45 },
//     { name: "Diana", score: 88 },
//     { name: "Eve", score: 30 },
//     { name: "Frank", score: 72 }
//   ];

//   console.log(categorizeStudents(students));


// ----------------
// Problem 4

// const library = [
//     { title: "The Hobbit", author: "Tolkien", isAvailable: true },
//     { title: "1984", author: "Orwell", isAvailable: true },
//     { title: "Dune", author: "Herbert", isAvailable: false }
// ];

// function findBook(library, title) {
//     for (const book of library) {
//         if (book.title === title) {
//             return book;
//         }
//     }
//     return null;
// }

// function borrowBook(library, title) {
//     const book = findBook(library, title);

//     if (book === null) {
//         return `"${title}" not found in the library.`;
//     }

//     if (!book.isAvailable) {
//         return `"${title}" is already borrowed.`;
//     }

//     book.isAvailable = false;
//     return `You have borrowed "${title}".`;
// }

// function returnBook(library, title) {
//     const book = findBook(library, title);

//     if (book === null) {
//         return `"${title}" not found in the library.`;
//     }

//     if (book.isAvailable) {
//         return `"${title}" was not borrowed.`;
//     }

//     book.isAvailable = true;
//     return `You have returned "${title}".`;
// }

// console.log(borrowBook(library, "The Hobbit"));
// console.log(borrowBook(library, "The Hobbit"));
// console.log(returnBook(library, "The Hobbit"));
// console.log(borrowBook(library, "Unknown Book"));

// --------------
// Problem 5

// function createEncoder(shift) {
//     const alphabet = "abcdefghijklmnopqrituvwxyz";

//     return function(message) {
//         let encoded = "";

//         for (let i = 0; i < message.length; i++) {
//             const char = message[i];
//             const index = alphabet.indexOf(char);
//             if (index !== -1) {
//                 const newIndex = (index + shift) % 26;
//                 encoded += alphabet[newIndex];
//             } else {
//                 encoded += char;
//             }
//         }

//         return encoded;
//     }
// }

// const encode3 = createEncoder(3);
// console.log(encode3("hello"));
// console.log(encode3("xyz"));

// const encode1 = createEncoder(1);
// console.log(encode1("abc"));


// --------------
// Problem 6

// function limitCalls(fn, maxCalls) {
//     let callCount = 0;
//     return function(name) {
//         if (callCount >= maxCalls) {
//             return "Call limit Reached";
//         }

//         callCount++;
//         return fn(name);
//     }
// }

// function sayHello(name) {
//     return `Hello, ${name}`;
// }

// const limitedHello = limitCalls(sayHello, 3);

// console.log(limitedHello("Alice"));
// console.log(limitedHello("Bob"));
// console.log(limitedHello("Charlie"));
// console.log(limitedHello("Diana"));
// console.log(limitedHello("Eve"));


// -------------
// FINAL PROBLEM

function createTodoManager() {
    const tasks = [];
    let nextId = 1;

    function findTask(id) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    return {
        addTask(title) {
            const task = {
                id: nextId,
                title: title,
                completed: false
            };
            tasks.push(task);
            nextId++;
            console.log(`Task added: "${title}" (ID: ${task.id})`);
        },

        completeTask(id) {
            const index = findTask(id);
            if (index === -1) {
                console.log(`Task with ID ${id} not found.`);
                return;
            }
            tasks[index].completed = true;
            console.log(`Task "${tasks[index].title}" marked as completed.`);
        },

        removeTask(id) {
            const index = findTask(id);
            if (index === -1) {
                console.log(`Task with ID ${id} not found.`);
                return;
            }
            const removed = tasks.splice(index, 1);
            console.log(`Task "${removed[0].title}" removed.`);
        },

        getTasks() {
            const copy = [];
            for (const task of tasks) {
                copy.push({
                    id: task.id,
                    title: task.title,
                    completed: task.completed
                });
            }
            return copy;
        },

        getPending() {
            const pending = [];
            for (const task of tasks) {
                if (!task.completed) {
                    pending.push({
                        id: task.id,
                        title: task.title,
                        completed: task.completed
                    });
                }
            }
            return pending;
        },

        getCompleted() {
            const completed = [];
            for (const task of tasks) {
                if (task.completed) {
                    completed.push({
                        id: task.id,
                        title: task.title,
                        completed: task.completed
                    });
                }
            }
            return completed;
        }
    };
}

const myTodos = createTodoManager();

myTodos.addTask("Learn closures");
myTodos.addTask("Build a project");
myTodos.addTask("Push to GitHub");

console.log(myTodos.getTasks());
// [
//   { id: 1, title: "Learn closures", completed: false },
//   { id: 2, title: "Build a project", completed: false },
//   { id: 3, title: "Push to GitHub", completed: false }
// ]

myTodos.completeTask(1);
console.log(myTodos.getCompleted());
// [ { id: 1, title: "Learn closures", completed: true } ]

console.log(myTodos.getPending());
// [
//   { id: 2, title: "Build a project", completed: false },
//   { id: 3, title: "Push to GitHub", completed: false }
// ]

myTodos.removeTask(2);
console.log(myTodos.getTasks());
// [
//   { id: 1, title: "Learn closures", completed: true },
//   { id: 3, title: "Push to GitHub", completed: false }
// ]

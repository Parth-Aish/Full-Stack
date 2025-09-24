// Import the built-in 'readline' module to handle command-line input/output
const readline = require('readline');

// Configure the readline interface to read from standard input and write to standard output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Use an in-memory array to store employee data for the current session
let employees = [];

/**
 * Displays the main menu and prompts the user for an action.
 */
function showMenu() {
    console.log('\n===== Employee Management System =====');
    console.log('1. Add a new employee');
    console.log('2. List all employees');
    console.log('3. Remove an employee');
    console.log('4. Exit');
    console.log('====================================');

    rl.question('Enter your choice (1-4): ', (choice) => {
        // Route user to the appropriate function based on their choice
        switch (choice) {
            case '1':
                addEmployee();
                break;
            case '2':
                listEmployees();
                break;
            case '3':
                removeEmployee();
                break;
            case '4':
                console.log('\nExiting application. Goodbye! 👋');
                rl.close(); // Close the readline interface and terminate the program
                break;
            default:
                console.log('\nInvalid choice. Please enter a number between 1 and 4.');
                showMenu(); // Show the menu again if the choice is invalid
                break;
        }
    });
}

/**
 * Prompts for and adds a new employee to the array.
 */
function addEmployee() {
    rl.question('Enter employee ID: ', (id) => {
        // Check if an employee with the same ID already exists
        const employeeExists = employees.find(emp => emp.id === id);
        if (employeeExists) {
            console.log(`\nError: An employee with ID ${id} already exists.`);
            showMenu();
            return;
        }

        rl.question('Enter employee name: ', (name) => {
            // Create a new employee object and add it to the array
            const newEmployee = { id, name };
            employees.push(newEmployee);
            console.log(`\n✅ Employee "${name}" added successfully!`);
            showMenu(); // Return to the main menu
        });
    });
}

/**
 * Displays all employees currently in the array.
 */
function listEmployees() {
    console.log('\n--- 🧑‍💼 All Employees ---');
    if (employees.length === 0) {
        console.log('No employees found.');
    } else {
        // Loop through the array and print each employee's details
        employees.forEach(emp => {
            console.log(`ID: ${emp.id}, Name: ${emp.name}`);
        });
    }
    console.log('------------------------');
    showMenu(); // Return to the main menu
}

/**
 * Prompts for an employee ID and removes the corresponding employee from the array.
 */
function removeEmployee() {
    rl.question('Enter the ID of the employee to remove: ', (id) => {
        // Find the index of the employee with the given ID
        const index = employees.findIndex(emp => emp.id === id);

        if (index !== -1) {
            // Use splice() to remove the employee from the array by index
            const removedEmployee = employees.splice(index, 1);
            console.log(`\n❌ Employee "${removedEmployee[0].name}" (ID: ${id}) has been removed.`);
        } else {
            console.log(`\nError: Employee with ID ${id} was not found.`);
        }
        showMenu(); // Return to the main menu
    });
}

// Initial call to start the application
console.log('Welcome to the CLI Employee Management System!');
showMenu();
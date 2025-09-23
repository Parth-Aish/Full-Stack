// Import the built-in 'readline' module to handle user input from the command line
const readline = require('readline');

// Configure the readline interface to read from the terminal and write to the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// In-memory array to store employee data. This acts as our temporary database.
let employees = [
    { id: '101', name: 'Alice' },
    { id: '102', name: 'Bob' }
];

/**
 * Displays the main menu of options to the user.
 */
function displayMenu() {
  console.log('\n--- Employee Management System ---');
  console.log('1. List all employees');
  console.log('2. Add a new employee');
  console.log('3. Remove an employee');
  console.log('4. Exit');
  promptUser();
}

/**
 * Prompts the user to select an option from the menu.
 */
function promptUser() {
  rl.question('Please choose an option (1-4): ', (choice) => {
    switch (choice) {
      case '1':
        listEmployees();
        break;
      case '2':
        addEmployee();
        break;
      case '3':
        removeEmployee();
        break;
      case '4':
        console.log('Exiting application. Goodbye!');
        rl.close(); // Closes the application
        break;
      default:
        console.log('Invalid option. Please choose a number between 1 and 4.');
        displayMenu(); // Show menu again
        break;
    }
  });
}

/**
 * Displays all employees currently in the array.
 */
function listEmployees() {
  console.log('\n--- Employee List ---');
  if (employees.length === 0) {
    console.log('No employees found.');
  } else {
    employees.forEach(emp => {
      console.log(`ID: ${emp.id}, Name: ${emp.name}`);
    });
  }
  displayMenu(); // Go back to the main menu
}

/**
 * Adds a new employee to the array after prompting for ID and name.
 */
function addEmployee() {
  console.log('\n--- Add New Employee ---');
  rl.question('Enter employee ID: ', (id) => {
    // Check if ID already exists
    if (employees.find(emp => emp.id === id)) {
      console.log('Error: An employee with this ID already exists.');
      displayMenu();
      return;
    }

    rl.question('Enter employee name: ', (name) => {
      employees.push({ id, name });
      console.log('Employee added successfully!');
      displayMenu(); // Go back to the main menu
    });
  });
}

/**
 * Removes an employee from the array based on the provided ID.
 */
function removeEmployee() {
  console.log('\n--- Remove Employee ---');
  rl.question('Enter the ID of the employee to remove: ', (id) => {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      employees.splice(index, 1);
      console.log('Employee removed successfully!');
    } else {
      console.log('Error: Employee with that ID not found.');
    }
    displayMenu(); // Go back to the main menu
  });
}

// Initial call to start the application
console.log('Welcome to the Employee Management CLI!');
displayMenu();
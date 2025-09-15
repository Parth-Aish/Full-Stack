import React from 'react';
import './App.css'; // Don't forget to use this for styling

// ======================================================
// 1. BASE CLASS DEFINITION
// ======================================================
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `My name is ${this.name} and I am ${this.age} years old.`;
  }

  getDetails() {
    return {
      type: 'Person',
      name: this.name,
      age: this.age,
      introduction: this.introduce()
    };
  }
}

// ======================================================
// 2. SUBCLASS DEFINITIONS
// ======================================================

// The Student class extends Person
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  introduce() {
    return `${super.introduce()} I am in grade ${this.grade}.`;
  }

  getDetails() {
    // Extend the parent's getDetails and add specific student info
    const parentDetails = super.getDetails();
    return {
      ...parentDetails,
      type: 'Student', // Override type
      grade: this.grade,
      introduction: this.introduce() // Use student's specific introduction
    };
  }
}

// The Teacher class extends Person
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  introduce() {
    return `${super.introduce()} I teach ${this.subject}.`;
  }

  getDetails() {
    // Extend the parent's getDetails and add specific teacher info
    const parentDetails = super.getDetails();
    return {
      ...parentDetails,
      type: 'Teacher', // Override type
      subject: this.subject,
      introduction: this.introduce() // Use teacher's specific introduction
    };
  }
}

// ======================================================
// 3. REACT COMPONENT FOR DISPLAY
// ======================================================

// A reusable component to display person/student/teacher details
function DetailCard({ person }) {
  // We use the getDetails method to easily extract all info
  const details = person.getDetails();

  return (
    <div className={`detail-card ${details.type.toLowerCase()}`}>
      <h3>{details.type} Details</h3>
      <p><strong>Name:</strong> {details.name}</p>
      <p><strong>Age:</strong> {details.age}</p>
      {details.grade && <p><strong>Grade:</strong> {details.grade}</p>}
      {details.subject && <p><strong>Subject:</strong> {details.subject}</p>}
      <p className="introduction">{details.introduction}</p>
    </div>
  );
}

// Main App component
function App() {
  // Create instances of the subclasses
  const person1 = new Person('John Doe', 30);
  const student1 = new Student('Alice Wonderland', 16, 11);
  const teacher1 = new Teacher('Dr. Emily White', 45, 'Biology');

  // Array of instances to render
  const entities = [person1, student1, teacher1];

  return (
    <div className="app-container">
      <h1>Person Class Hierarchy with UI</h1>
      <p>Demonstrating inheritance with different roles.</p>

      <div className="cards-container">
        {entities.map((entity, index) => (
          <DetailCard key={index} person={entity} />
        ))}
      </div>
    </div>
  );
}

export default App;
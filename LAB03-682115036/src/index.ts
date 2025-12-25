console.log("Hello, TypeScript + JSON");

type Student = {
    id: number;
    name: string;
    grade: number;
    isActive: boolean;
}

// Create at least 5 student as Sample Data
const students: Student[] = [
    { id: 1, name: "Ann", grade: 3.5, isActive: true },
    { id: 2, name: "Bob", grade: 2.7, isActive: false },
];
function getActiveStudents(students: Student[]): Student[] {
    return students.filter((s) => s.isActive);
};

function calculateAverageGrade(students: Student[]): number {
    if (students.length === 0) return 0;
    const total = students.reduce((sum, s) => sum + s.grade, 0);
    return total / students.length;
}

console.log("All students: ", students);
console.log("Active students: ", getActiveStudents(students));
console.log("Average grade: ", calculateAverageGrade(students));
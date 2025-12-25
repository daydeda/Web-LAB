import { loadStudents, saveStudents, addStudent } from "./services/studentServices";

const students = loadStudents();
const update = addStudent(students, "Mina", "UX");
saveStudents(update);

console.log("Update students: ", update);
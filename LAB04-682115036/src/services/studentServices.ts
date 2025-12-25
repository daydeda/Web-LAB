import fs from "fs";
import path from "path";
import { student } from "../models/student.js";

const dataPath = path.join(process.cwd(), "src", "data", "students.json");

export function loadStudents(): student[] {
    const text = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(text) as student[];
}

export function saveStudents(students: student[]): void {
    fs.writeFileSync(dataPath, JSON.stringify(students, null, 2), "utf-8");
}

export function addStudent(students: student[], name: string, major: string): student[]{
    const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent: student = { id: nextId, name, major };
    return [...students, newStudent];
};
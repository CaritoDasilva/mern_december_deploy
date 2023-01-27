import axios from "axios";


export const createNewStudent = (student) => axios.post('http://localhost:8080/api/student', {
    student
});

export const getAllStudents = () => axios.get('http://localhost:8080/api/student');

export const deleteStudent = (id) => axios.delete(`http://localhost:8080/api/student/${id}`);

export const getOneStudent = (id) => axios.get(`http://localhost:8080/api/student/${id}`);

export const updateOneStudent = (id, student) => axios.put(`http://localhost:8080/api/student/${id}`, {
    student
})
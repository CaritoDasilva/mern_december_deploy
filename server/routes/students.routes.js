const { getAllStudents, updateStudent, createStudent, removeStudent, getOneStudent } = require("../controllers/students.controllers");

module.exports = (app) => {
    app.get('/api/student', getAllStudents)
    app.get('/api/student/:id', getOneStudent);
    app.post('/api/student', createStudent);
    app.put('/api/student/:id', updateStudent);
    app.delete('/api/student/:id', removeStudent);
};
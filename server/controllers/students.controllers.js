const Student = require("../models/student.model");

module.exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json({
            message: 'Se entregan de manera exitosa todos los estudiantes',
            students,
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error,
        });
    };
}

module.exports.createStudent = async (req, res) => {
    try {
        const newStudent = await Student.create(req.body.student);
        res.json({
            message: 'Se crea de manera exitosa el estudiante nuevo',
            newStudent,
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error,
        });
    }
}

module.exports.updateStudent = async (req, res) => {
    try {
        const { params, body } = req;
        const { id } = params;
        const updatedStudent = await Student.findByIdAndUpdate(id, body.student, { new: true });
        res.json({
            message: 'Se actualiza de manera exitosa la información del estudiante',
            updatedStudent,
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error,
        });
    }
}

module.exports.removeStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.deleteOne({ _id: id });
        res.json({
            message: 'Se actualiza de manera exitosa la información del estudiante',
            deletedStudent,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error,
        });
    }
}

module.exports.getOneStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        res.json({
            message: 'Se trae de manera exitosa la información del estudiante',
            student,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Ups! no hemos podido hacer lo que nos solicitaste',
            error,
        });
    }
}
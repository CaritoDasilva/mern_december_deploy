const { Schema, model } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const studentSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Debe ingresar un nombre al estudiante'],
        minlength: [2, 'No puede tener menos de 3 caracteres']
    },
    rut: {
        type: String,
        required: [true, 'Debe ingresar un rut al estudiante'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Este campo es requerido'],
        unique: true
    },
    course: {
        type: String,
        required: [true, 'Debe asignar un curso al estudiante'],
    },
    teacher: {
        type: String,
        required: [true, 'Debe tener un tiempo de cocción'],
        min: [1, 'No puede tener un valor inferior a $1']
    },
    // To DO: Anidar objetos de otro schema
    grades: {
        type: Number
    }

}, { timestamps: true });

studentSchema.plugin(uniqueValidator, { message: '{PATH} ya existe, favor intentar con uno nuevo' });

const Student = model('Student', studentSchema);

module.exports = Student;
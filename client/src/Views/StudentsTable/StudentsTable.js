import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { deleteStudent, getAllStudents } from "../../services/students-service";
import styles from './StudentsTable.module.scss';

const StudentsTable = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    const getStudentsFromService = async () => {
        try {
            const studentsFromService = await getAllStudents();
            setStudents(studentsFromService.data.students);
        } catch (error) {
            console.log("🚀 ~ file: StudentsTable.js:12 ~ getStudentsFromService ~ error", error)
            
        }
    };

    const removeStudentFromService = async (id) => {
        try {
            await deleteStudent(id);
            const newStudentsList = students.filter(student => student._id !== id);
            setStudents(newStudentsList);
        } catch (error) {
            console.log("🚀 ~ file: StudentsTable.js:26 ~ removeStudentFromService ~ error", error)
            
        }
    }

    useEffect(() => {
        getStudentsFromService();
    }, []);
    

    return (
        <div className={styles["table-container"]}>
            <h1>Estudiantes</h1>
            {/* <Button variant="info" onClick={() => navigate("/crear-estudiante")} >Nuevo estudiante</Button> */}
             <Button variant="info" onClick={() => navigate("/nuevo-estudiante")} >Nuevo estudiante</Button>
            <Table className={styles["table-students"]} striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre completo</th>
                        <th>Curso</th>
                        <th>Rut</th>
                        <th>Email</th>
                        <th>Profesor</th>
                        <th>Nota</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.length > 0 ? students.map((student, idx) => (
                            <tr key={student._id}>
                                <td>{idx +1}</td>
                                <td>{student.fullName}</td>
                                <td>{student.course}</td>
                                <td>{student.rut}</td>
                                <td>{student.email}</td>
                                <td>{student.teacher}</td>
                                <td>{student.grades || "-"}</td>
                                <td>
                                    <Button variant="outline-info" onClick={() => navigate(`/editar-estudiante/${student._id}`)} >Editar</Button>
                                    <Button variant="outline-danger" onClick={() => removeStudentFromService(student._id)} >Eliminar</Button>
                                </td>
                            </tr>
                        )) : 
                            <tr>
                                <td colSpan={8}>No hay ningún estudiante inscrito</td>
                            </tr>
                    }
                </tbody>
            </Table>
        </div>
    )

}

export default StudentsTable;
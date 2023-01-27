import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; 
import { useNavigate, useParams } from "react-router-dom";
import styles from './StudentForm/StudentForm.module.scss';
import { createNewStudent, getOneStudent, updateOneStudent } from "../services/students-service";
const StudentCreationAndUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [student, setStudent] = useState({
        fullName: '',
        rut: '',
        email: '',
        course: '',
        teacher: '',
        grades: null,

    })
    const [errorsResponse, setErrorsResponse] = useState();

    const studentSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        rut: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        course: Yup.string()
            .required('Debe asignar un curso al estudiante'),
        teacher: Yup.string()
            .required('Debe asignar un profesor al estudiante'),
        grades: Yup.number(),
    });

    const getOneStudentFromService = async () => {
        try {
            const studentFromService = await getOneStudent(id);
            setStudent({ ...studentFromService.data.student, grades: studentFromService.data.student.grades || 0 });

        } catch (error) {
            console.log("🚀 ~ file: StudentForm.js:25 ~ getOneStudentFromService ~ error", error)

        };
    }; 

    useEffect(() => {
        id && getOneStudentFromService();
    }, [id]);

    const sendStudent = async (values) => {
        try {
            // console.log("🚀 ~ file: StudentCreationAndUpdate.js:38 ~ sendStudent ~ values", values)
            id ? await updateOneStudent(id, values) : await createNewStudent(values);
        } catch (error) {
            console.log("🚀 ~ file: StudentCreationAndUpdate.js:59 ~ sendStudent ~ error", error.response.data.error.errors)
            setErrorsResponse(error.response.data.error.errors)
        }

    }

    return (
        <div className={styles['form-container']}>
            <Button variant="info" onClick={() => navigate("/estudiantes")} >Volver</Button>
            <h1>Nuevo Estudiante</h1>
            <Formik
                enableReinitialize
                initialValues={student}
                onSubmit={sendStudent}
                // validationSchema={studentSchema}
            >
                
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="fullName">Nombre Completo</label>
                        <Field name='fullName' />
                        {(errors.fullName && touched.fullName) && (
                            <p>{errors.fullName}</p>
                        )}
                        {(errorsResponse?.fullName) && (
                            <p>{errorsResponse?.fullName.message}</p>
                        )}
                        <label htmlFor="rut">Rut</label>
                        <Field name='rut' />
                        {(errors.rut && touched.rut) && (
                            <p>{errors.rut}</p>
                        )}
                        <label htmlFor="email">Email</label>
                        <Field name='email' />
                        {(errors.email && touched.email) && (
                            <p>{errors.email}</p>
                        )}
                        <label htmlFor="course">Curso</label>
                        <Field name='course' />
                        {(errors.course && touched.course) && (
                            <p>{errors.course}</p>
                        )}
                        <label htmlFor="teacher">Profesor</label>
                        <Field name='teacher' />
                        {(errors.teacher && touched.teacher) && (
                            <p>{errors.teacher}</p>
                        )}
                        <label htmlFor="grades">Notas</label>
                        <Field name='grades' type="number" />
                        {(errors.grades && touched.grades) && (
                            <p>{errors.grades}</p>
                        )}
                        <Button variant="dark" type="submit">Enviar</Button>

                    </Form>
                )}

            </Formik>
        </div>
    )
};

export default StudentCreationAndUpdate;
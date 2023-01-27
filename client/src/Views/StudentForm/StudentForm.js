import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import styles from './StudentForm.module.scss';
import { createNewStudent, getOneStudent, updateOneStudent } from "../../services/students-service";

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        fullName: '',
        rut: '',
        email: '',
        course: '',
        teacher: '',
        grades: 0,
    });
    const [errorsResponse, setErrorsResponse] = useState();

    const getOneStudentFromService = async () => {
        try {
            const studentFromService = await getOneStudent(id);
            setStudent({ ...studentFromService.data.student, grades: studentFromService.data.student.grades || 0});

        } catch(error) {
            console.log("🚀 ~ file: StudentForm.js:25 ~ getOneStudentFromService ~ error", error)
            
        };
    };

    useEffect(() => {
        id && getOneStudentFromService();
    }, [id]);

    const studentSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Debe ingresar un nombre al estudiante'),
        rut: Yup.string()
            .min(2, 'Too Short!')
            .required('Debe ingresar un rut al estudiante'),
        email: Yup.string()
            .email('Debe ingresar un email válido')
            .required('Debe ingresar un email válido'),
        course: Yup.string()
            .required('Debe asignar un curso al estudiante'),
        teacher: Yup.string()
            .required('Debe asignar un profesor al estudiante'),
        grades: Yup.number(),
    });

    const sendNewStudent = async (values) => {
        try {
            console.log("🚀 ~ file: StudentForm.js:38 ~ sendNewStudent ~ values", values)
            const newStudent = id ? await updateOneStudent(id, values) : await createNewStudent(values);
            navigate("/estudiantes");
            
        } catch (error) {
            console.log("🚀 ~ file: StudentForm.js:61 ~ sendNewStudent ~ error", error.response.data.error)
            setErrorsResponse(error.response.data.error.errors)
        }


    };

    return (
        <div className={styles['form-container']}>
            <Button onClick={() => navigate("/estudiantes")} variant="info">Volver</Button>

            <h1>Agregar Nuevo Estudiante</h1>
            <Formik
                enableReinitialize
                initialValues={student}
                // validationSchema={studentSchema}
                onSubmit={sendNewStudent}
            >
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="fullName">Nombre completo</label>
                        <Field name="fullName" />
                        {errors.fullName && touched.fullName ? (
                            <div>{errors.fullName}</div>
                        ) : null}
                        {errorsResponse?.fullName && (
                            <div>{errorsResponse.fullName.message}</div>
                        )}
                        <label htmlFor="rut">Rut</label>
                        <Field name="rut" />
                        {errors.rut && touched.rut ? (
                            <div>{errors.rut}</div>
                        ) : null}
                        {errorsResponse?.rut && (
                            <div>{errorsResponse.rut.message}</div>
                        )}
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        {errorsResponse?.email && (
                            <div>{errorsResponse.email.message}</div>
                        )}
                        <label htmlFor="course">Curso</label>
                        <Field name="course" type="text" />
                        {errors.course && touched.course ? <div>{errors.course}</div> : null}
                        {errorsResponse?.course && (
                            <div>{errorsResponse.course.message}</div>
                        )}
                        <label htmlFor="teacher">Profesor</label>
                        <Field name="teacher" />
                        {errors.teacher && touched.teacher ? (
                            <div>{errors.teacher}</div>
                        ) : null}
                        {errorsResponse?.teacher && (
                            <div>{errorsResponse.teacher.message}</div>
                        )}
                        <label htmlFor="grades">Notas</label>
                        <Field name="grades" type="number" />
                        {errors.grades && touched.grades ? (
                            <div>{errors.grades}</div>
                        ) : null}
                        {errorsResponse?.grades && (
                            <div>{errorsResponse.grades.message}</div>
                        )}
                        <button type="submit">Enviar</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default StudentForm;


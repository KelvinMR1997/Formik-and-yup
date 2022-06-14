import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import "./formStyles.css";
export const UserForm = () => {
  const schemaValidateUser = Yup.object().shape({
    username: Yup.string()
      .required("El nombre es un campo requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .matches(
        /^[aA-zZ\s]+$/,
        "No se permiten caracteres especiales ni números"
      ),
    city: Yup.string().required("La ciudad es un campo requerido"),
    gender: Yup.object({
      code: Yup.string().required("El campo de genero es obligatorio"),
    }),
    doc: Yup.number()
      .required("El documento es un campo requerido")
      .positive()
      .integer()
      .typeError("El documento debe ser un número"),
  });
  const msgs2 = useRef(null);
  const [users, setUser] = useState([]);
  const [validateUser, setValidateUser] = useState({
    doc: "",
    username: "",
    gender: "",
  });
  const handleSubmit = (values) => {
    console.log(values);
    setValidateUser(values);
    setUser([...users, values]);
    msgs2.current.show([
      {
        severity: "success",
        // summary: "Success",
        detail: (
          <span>
            Nombre: {values.username}, Documento: {values.doc}, Genero: 
            {values.gender?.code}, Ciudad: 
            {values.city},
          </span>
        ),
        sticky: true,
      },
    ]);
  };
  const header = (
    <img
      alt="Card"
      src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg"
      onError={(e) =>
        (e.target.src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
    />
  );
  const genders = [
    {
      name: "Masculino",
      code: "Masculino",
    },
    {
      name: "Femenino",
      code: "Femenino",
    },
    {
      name: "Prefiero no especificar",
      code: "Prefiero no especificar",
    },
  ];
  return (
    <>
      <div className="d-flex m-5 rounded justify-content-center">
        <Card
          title="Formulario"
          className="border-round"
          style={{ width: "28em" }}
          header={header}
        >
          <Messages ref={msgs2} />
          <Formik
            initialValues={{
              doc: "",
              username: "",
            }}
            validationSchema={schemaValidateUser}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className="" autoComplete="off">
                {/* NAME */}
                <div className="formgroup-inline mb-2">
                  <Field name="username" type="text">
                    {({ field }) => (
                      <>
                        <h5>Nombre</h5>
                        <InputText
                          className="text"
                          placeholder="Nombre"
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                  {errors.username && touched.username ? (
                    <Message
                      className="mt-1"
                      severity="error"
                      text={errors.username}
                    />
                  ) : null}
                </div>

                {/* CC */}
                <div className="">
                  <Field name="doc" type="number">
                    {({ field }) => (
                      <>
                        <h5>C.C</h5>
                        <InputText
                          className="text"
                          placeholder="Documento"
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                  {errors.doc && touched.doc ? (
                    <Message
                      className="mt-1"
                      severity="error"
                      text={errors.doc}
                    />
                  ) : null}
                </div>
                {/* GENDER */}
                <div className="">
                  <Field name="gender">
                    {({ field }) => (
                      <>
                        <h5>Genero</h5>
                        <Dropdown
                          options={genders}
                          optionLabel="name"
                          placeholder="Genero"
                          {...field}
                        />
                      </>
                    )}
                  </Field>
                </div>
                {errors.gender?.code !== undefined ? (
                  <Message
                    className="mt-1"
                    severity="error"
                    text={errors.gender?.code}
                  />
                ) : null}
                {/* CITY */}
                <div className="">
                  <Field name="city">
                    {({ field }) => (
                      <>
                        <h5>Ciudad</h5>
                        <div className="d-flex justify-content-between mx-5">
                          <RadioButton
                            {...field}
                            inputId="city1"
                            name="city"
                            value="Chicago"
                          />
                          <label htmlFor="city1">Chicago</label>
                          <RadioButton
                            {...field}
                            inputId="city2"
                            name="city"
                            value="Los Angeles"
                          />
                          <label htmlFor="city2">Los Angeles</label>
                          <RadioButton
                            {...field}
                            inputId="city3"
                            name="city"
                            value="New York"
                          />
                          <label htmlFor="city3">New York</label>
                        </div>
                      </>
                    )}
                  </Field>
                  {errors.city !== undefined ? (
                    <Message
                      className="mt-1"
                      severity="error"
                      text={errors.city}
                    />
                  ) : null}
                </div>

                <Button
                  type="submit"
                  label="Enviar"
                  icon="pi pi-check"
                  className="mt-2"
                />
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </>
  );
};

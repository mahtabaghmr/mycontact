import { Spiner } from "..";
import { PURPLE } from "../../helpers/color"
import { ContactContext } from "../../contecst/cotactContext";
import { useContext } from "react";
import { Formik, Form,ErrorMessage,Field } from 'formik';
import { contactSchema } from '../../validations/contactValidation';

const AddContact = () => {

    const { loading, groups, createContact } = useContext(ContactContext)


    return (
        <>
            {loading ? <Spiner /> : (

                <div className=" container">

                    <div className="row">

                        <div className="col-md-6">
                           

                            <Formik

                                initialValues={{
                                    fullname: "",
                                    job: "",
                                    photo: "",
                                    mobile: "",
                                    group: "",
                                    email: "",
                                }}
                                validationSchema={contactSchema}
                                onSubmit={(values) => {
                                    createContact(values);
                                }}
                            >



                                <Form style={{ marginRight: "3cm", marginTop: "2cm" }}>


                                    <Field
                                        className="mt-5 form-control"
                                        type="text"
                                        name="fullname"
                                        placeholder="نام و نام خانوادگی" />
                                    <br />

                                    <ErrorMessage
                                        name="fullname"
                                        render={(msg) => (<div className="text-danger">{msg}</div>)}
                                    />

                                    <Field
                                        className="mt-5 form-control"
                                        type="text"
                                        name="photo"
                                        placeholder="عکس شما" />
                                    <br />

                                    <ErrorMessage
                                        name="photo"
                                        render={(msg) => (<div className="text-danger">{msg}</div>)}
                                    />

                                    <Field
                                        className="mt-5 form-control"
                                        type="text"
                                        name="mobile"
                                        placeholder="شماره موبایل" />
                                    <br />

                                    <ErrorMessage
                                        name="mobile"
                                        render={(msg) => (<div className="text-danger">{msg}</div>)}
                                    />

                                    <Field
                                        className="mt-5 form-control"
                                        type="text"
                                        name="email"
                                        placeholder="ایمیل" />
                                    <br />

                                    <ErrorMessage
                                        name="email"
                                        render={(msg) => (<div className="text-danger">{msg}</div>)}
                                    />

                                    <Field
                                        className="mt-5 form-control"
                                        type="text"
                                        name="job"
                                        placeholder=" شغل " />
                                    <br />

                                    <ErrorMessage
                                        name="job"
                                        render={(msg) => (<div className="text-danger">{msg}</div>)}
                                    />

                                    <Field
                                        className="mt-5 form-control"
                                        name="group"
                                        as="select"
                                        placeholder="گروه "
                                    >

                                        {groups.length > 0 &&
                                            groups.map((group) => <option value={group.id} key={group.id}>{group.name}</option>)

                                        }

                                    </Field>


                                    <ErrorMessage
                                        name="group"
                                        render={(msg) => (<div className="text-danger">{msg}</div>)}
                                    />

                                    <br />

                                    <input type="submit"
                                        className="btn"
                                        style={{ backgroundColor: PURPLE }}
                                        value="ساخت مخاطب"
                                    />

                                </Form>

                            </Formik>



                        </div>
                        <div className="col-md-6">
                            <img
                                src={require("../../assets/man-taking-note.png")}
                                height="400px"
                                style={{
                                    marginTop: "3cm",
                                    position: "absolute",
                                    zIndex: "-1",
                                    top: "130px",
                                    left: "100px",
                                    opacity: "50%",
                                }}
                            />
                        </div>
                    </div>


                </div>
            )
            }


        </>
    );
}
export default AddContact;
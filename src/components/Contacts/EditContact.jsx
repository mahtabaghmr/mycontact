import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllGroups, getContact, updateContact } from "../../services/contactService";
import { Spiner } from "..";
import { PURPLE } from "../../helpers/color"
import { ContactContext } from "../../contecst/cotactContext";
import { useContext } from "react";
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { contactSchema } from "../../validations/contactValidation";
import { useImmer } from "use-immer";


const EditContact = () => {

    const { contacts, setContacts, setFilteredContact, setLoading, loading, groups } = useContext(ContactContext);

    const navigate = useNavigate();
    const { contactId } = useParams();
    const [contact, setContact] = useImmer({});

    useEffect(() => {

        const fetchData = async () => {

            try {
                setLoading(true);

                const { data: contactData } = await getContact(contactId);
                setLoading(false);
                setContact(contactData);

            } catch (err) {
                console.log(err.message);
                setLoading(false);
            }
        }

        fetchData();

    }, []);


    const submitForm = async (values) => {
        try {
            setLoading(true);
            const { data, status } = await updateContact(values, contactId);


            if (status === 200) {

                setLoading(false);

                setContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
                    draft[contactIndex] = { ...data }
                });

                setFilteredContact(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
                    draft[contactIndex] = { ...data }
                });
              

                navigate("/contacts");
            }

        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }

    }


    return (
        <>
            {loading ? <Spiner /> : (

                <div className=" container">
                    <div className="row">
                        <div className="col-md-6">
                            <Formik

                                initialValues={contact}

                                validationSchema={contactSchema}
                                onSubmit={(values) => {
                                    submitForm(values);
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
                                        value="ویرایش مخاطب"
                                    />

                                </Form>

                            </Formik>



                        </div>

                        <div className="col-md-6 ">
                            <img src={contact.photo} alt="" />

                        </div>
                    </div>
                </div>

            )}
        </>
    );
}
export default EditContact;
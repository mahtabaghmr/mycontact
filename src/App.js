import { Navbar, Contacts, AddContact, ViewContact, EditContact, Contact } from "./components";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router";
import { getAllContacts, getAllGroups, createContact, deleteContact } from "./services/contactService";
import { confirmAlert } from 'react-confirm-alert';
import {
  CURRENTLINE,
  FOREGROUND,
  PURPLE,
  YELLOW,
  COMMENT,
} from "./helpers/color";
import { ContactContext } from "./contecst/cotactContext";
import _ from "lodash";
import { contactSchema } from './validations/contactValidation'
import { useImmer } from "use-immer";
import { toast, ToastContainer } from "react-toastify";

const App = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [filteredContacts, setFilteredContact] = useImmer([]);


  useEffect(() => {

    const fetchData = async () => {
      try {

        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContact(contactsData);
        setGroups(groupsData);
        setLoading(false);

      } catch (err) {

        console.log(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);


  const createContactF = async (values) => {

    try {
      setLoading(true);
      //  await contactSchema.validate(contact,{abortEarly:false});

      const { status, data } = await createContact(values);

      if (status === 201) {


        setContacts(draft => { draft.push(data) });
        setFilteredContact(draft => { draft.push(data) });

        setLoading(false);

        toast.success("مخاطب با موفقیت ساخته شد")
        navigate("/contacts");
      }
    } catch (err) {
      // setErrors(err.inner);
      console.log(err.message);
      //console.log(err.inner);
      setLoading(false);
    }
  };

  const confirmDelete = (contactId, contactFullname) => {

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>

        );
      }
    });
  }

  const removeContact = async (contactId) => {
    try {

      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {

        setContacts(draft => contacts.filter(c => c.id != contactId));
        setFilteredContact(draft => contacts.filter(c => c.id != contactId));

        setLoading(false);
         toast.error("مخاطب حذف شد");
      }

    } catch (err) {

      console.log(err.message);
      setLoading(false);
    }
  }


  const contactSearch = _.debounce((query) => {

    if (!query) return setFilteredContact([...contacts]);

    setFilteredContact(
      contacts.filter((contact) => {
        return contact.fullname.toLowerCase().includes(query.toLowerCase());
      })
    );

  }, 1000);

  return (

    <ContactContext.Provider
      value={{
        loading,
        setLoading,
        setContacts,
        setFilteredContact,
        contacts,
        filteredContacts,
        groups,
        deleteContact: confirmDelete,
        createContact: createContactF,
        contactSearch,
      }}
    >
      <div className="App">
        <ToastContainer rtl={true} position="top-right" theme="colored" />
        <Navbar />
        <Routes>

          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />

        </Routes>

      </div>
    </ContactContext.Provider>
  );
}

export default App;


import { createContext } from "react";

export const ContactContext = createContext({
    loading : false ,
    setLoading : () => {},
    groups : [],
    contacts : [],
    errors : [],
    setContacts : () => {},
    filteredContacts : [],
    setFilteredContact : () => {},
    createContact : () => {},
    deleteContact : () => {},
    updateContact : () => {},
    contactSearch : () => {},

});
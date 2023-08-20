import { getContact, getGroup } from "../../services/contactService";
import { useEffect, useState } from "react";
import { useParams , Link } from "react-router-dom";
import {  Spiner } from "..";
import {CURRENTLINE ,PURPLE} from "../../helpers/color";
import { ContactContext } from "../../contecst/cotactContext";
import { useContext } from "react";

const ViewContact = () => {

    const {loading} =useContext(ContactContext);
    const { contactId } = useParams();
    const [state, setState] = useState({
        group: {},
        contact: {}
    });

    useEffect(() => {
        const fetchData = async () => {

            try {
                setState({ ...state, loading: true });
                const { data: contactData } = await getContact(contactId);
                const { data: groupData } = await getGroup(contactData.group);
                setState({ ...state, loading: false, contact: contactData, group: groupData });
            } catch (err) {

                console.log(err.message);
                setState({ ...state, loading: false });
            }
        }

        fetchData();
    }, []);

    const { contact, group } = state;

    return (
        <>
            {loading ? <Spiner /> : (

                <div className="container">
                    <div className="row mt-5 p-2" style={{backgroundColor : CURRENTLINE}}>
                        <div className="col-md-6">
                            <img src={contact.photo} alt="" />
                        </div>
                        <div className="col-md-6 text-white">
                            <p> {contact.fullname}</p>
                            <p> {contact.email}</p>
                            <p> {contact.job}</p>
                            <p> {contact.mobile}</p>
                            <p> {group.name}</p>

                        </div>

                       
                    </div>
                    <Link
                      to={"/contacts"}
                      className="btn mt-5"
                      style={{ backgroundColor: PURPLE }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                </div>

            )}

        </>
    );
}

export default ViewContact;
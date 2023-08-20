import { YELLOW, PINK, ORANGE, CURRENTLINE } from "../../helpers/color"
import { Spiner, Contact } from "..";
import { Link } from "react-router-dom";
import { ContactContext } from "../../contecst/cotactContext";
import { useContext } from "react";

const Contacts = () => {

    const {filteredContacts, loading, deleteContact } = useContext(ContactContext);

    return (
        <>
            <section className="container mt-4 ">
                <Link
                    to={"/contacts/add"}
                    className="p-2"
                    style={{ backgroundColor: PINK, borderRadius: '10px' , color : "black" }}
                >
                    ساخت مخاطب جدید
                    <i className="fa fa-plus-circle mx-2" />
                </Link>
                <hr style={{ color: YELLOW }} />
            </section>

            {loading ? <Spiner /> : (

                <section className="container">

                    {filteredContacts.length > 0 ? filteredContacts.map((c) => <Contact key={c.id} contact={c}
                    deleteContact ={ () => deleteContact(c.id , c.fullname)}
                    />) : (

                        <div
                            className="text-center py-5"
                            style={{ backgroundColor: CURRENTLINE }}
                        >
                            <p className="h3" style={{ color: ORANGE }}>
                                مخاطب یافت نشد ...
                            </p>
                            <img
                                src={require("../../assets/no-found.gif")}
                                alt="پیدا نشد"
                                className="w-25"
                            />
                        </div>
                    )}

                </section>
            )}
        </>
    );
}

export default Contacts;
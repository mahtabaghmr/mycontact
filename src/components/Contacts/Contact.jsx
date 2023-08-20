import { PURPLE, CURRENTLINE, CYAN, ORANGE, RED } from "../../helpers/color";
import { Link } from "react-router-dom";

const Contact = ({ contact , deleteContact }) => {

    return (
        <>
            <div className="container mt-4 py-4" style={{ backgroundColor: CURRENTLINE }}  >
                <div className=" row text-white">

                    <div className="col-10">
                        <div className="row">
                            <div className="col-md-4">
                                <img
                                    src={contact.photo}
                                    alt=""
                                    style={{ border: `1px solid ${PURPLE}` }}
                                    className="img-fluid rounded"
                                />
                            </div>

                            <div className="col-md-6 text-center">
                                <p>{" "}</p>
                                <h6> نام ونام خوانوادگی : {contact.fullname}</h6>
                                <br />
                                <h6> ایمیل :   {contact.email}</h6>
                                <br />
                                <h6> شماره موبایل :  {contact.mobile}</h6>
                                <br />
                                <h6> شغل :   {contact.job}</h6>

                            </div>
                        </div>
                    </div>

                    <div className="col-2 d-flex flex-column ">
                        <Link to={`/contacts/${contact.id}`} className="my-3" style={{ backgroundColor: ORANGE , textAlign:"center",color:"black" }}>
                            <i className="fa fa-eye" />
                        </Link>

                        <Link
                        to={`/contacts/edit/${contact.id}`}
                         className="my-3" style={{ backgroundColor: CYAN , textAlign:"center",color:"black"}}>
                            <i className="fa fa-pencil" />
                        </Link>

                        <button onClick={deleteContact} className="my-3" style={{ backgroundColor: RED }}>
                            <i className="fa fa-trash" />
                        </button>
                    </div>


                </div>

            </div>



        </>
    );
}

export default Contact;

import { useContext } from "react";
import { ContactContext } from "../../contecst/cotactContext";

const SearchContact = () => {

    const { contactSearch } = useContext(ContactContext);
    return (

        <div className="input-group w-100 " dir="ltr">

            <span className="input-group-text">
                <i class="fa fa-search" aria-hidden="true"></i>
            </span>
            <input
                type="text"
                
                onChange={(event) => contactSearch(event.target.value) }
                className="form-control"
                placeholder="جست و جوی مخاطبین..."
                dir="rtl"
            />

        </div>
    );
}
export default SearchContact;
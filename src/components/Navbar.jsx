import { PURPLE, BACKGROUND } from '../helpers/color'
import { SearchContact } from '.';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();
    return (
        <nav className="navbar-expand-sm navbar shadow-lg" style={{ background: BACKGROUND }}>

            <div className="container">
                <div className="row w-100">

                    <div className="col-6 text-white ">
                        <div className="navbar-brand">
                            <p> <i className="fa fa-id-badge" style={{ color: PURPLE }} />{" "}وبسایت مخاطبین من</p>

                        </div>
                    </div>

                    {location.pathname === "/contacts" && (<div className="col-6">

                        <SearchContact />

                    </div>) }

                </div>
            </div>
        </nav>

    );
}

export default Navbar;
import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Header()
{
    return(
        <div id="header-sec">
            <div id="header-left">
                <Link to="/">Andrew Presta</Link>
            </div>
            <div id="header-right">
                <Link to="/">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/">Contact</Link>
            </div>
        </div>
    );
}
export default Header;
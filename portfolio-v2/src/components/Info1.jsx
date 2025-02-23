import '../styles/Info1.css';
import Me from '../images/Me.jpg';
function Info1()
{
    return(
        <div id="info1-container">
            <p>Hello, my name is Andrew Presta and I have been programming for 7+ years.</p>
            <img src={Me} alt="Photo of Andrew Presta" />
        </div>
    );
}
export default Info1;
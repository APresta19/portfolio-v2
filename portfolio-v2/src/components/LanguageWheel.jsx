import '../styles/LanguageWheel.css';

function LanguageWheel()
{
    return(
        <div id="software-slider">
            <div id="software-list">
                <img style={{"--position": 1}} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" className="sware-item"/>
                <img style={{"--position": 2}} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" className="sware-item"/>
                <img style={{"--position": 3}} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original-wordmark.svg" className="sware-item"/>
                <img style={{"--position": 4}} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg" className="sware-item"/>
                <img style={{"--position": 5}} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" className="sware-item"/>
            </div>
        </div>
    );
}

export default LanguageWheel;
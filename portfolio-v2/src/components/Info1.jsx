import '../styles/Info1.css';
import Me from '../images/Me.jpg';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, transform, useAnimation } from 'framer-motion';
function Info1()
{
    const control = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if(inView) {
            control.start("visible");
        }
        else
        {
            control.start("hidden");
        }
    }, [control, inView])
    return(
        <>
            <hr></hr>
            <div id="info1-container">
                <div className="left">
                <motion.div ref={ref} variants={textVariant} initial="hidden" animate={control}>
                    <p>I have been programming for 7+ years</p>
                </motion.div>
                </div>
                <div className="right">
                <motion.div ref={ref} variants={textVariant} initial="hidden" animate={control}>
                    <img src={Me} alt="Photo of Andrew Presta" width="350" height="350"></img>
                </motion.div>
                </div>
            </div>
            <motion.div 
            className="text"
            ref={ref}
            variants={textVariant}
            initial="hidden"
            animate={control}>
                My animated text
            </motion.div>
        </>
    );
}
const textVariant = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -10 },
};

export default Info1;
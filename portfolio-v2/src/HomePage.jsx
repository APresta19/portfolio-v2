import ThreeDimShape from './components/ThreeDimShape';
import Header from './components/Header';
import Welcome from './components/Welcome';
import Info1 from './components/Info1';
import LanguageWheel from './components/LanguageWheel';

function HomePage()
{
    return(
        <>
            <ThreeDimShape />
            <Header />
            <Welcome />
            <Info1 />
            <LanguageWheel />
        </>
    );
}
export default HomePage;
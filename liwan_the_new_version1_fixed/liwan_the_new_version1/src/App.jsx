import Hero from "./Section/HeroSection/Hero.jsx";
import Cards from "./Section/discoverLiwan/cards.jsx";
import "./App.css"
import Services from "./Section/Services/services.jsx";
import AdvantagesAndCommunicationSection from "./Section/AdvantagesAndCommunicationSection/AdvantagesAndCommunicationSection.jsx";
import Footer from "./Section/footer/footer.jsx";
import NavBar from "./Section/NavBar/NavBar.jsx";




function App(){
    return(
        <div className="App">
            <NavBar/>
            <Hero/>
            <Cards/>
            <Services/>
            <AdvantagesAndCommunicationSection/>
            <Footer/>



        </div>

    );

}
export default App

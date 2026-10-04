import "./ArobPage.css";
import "./Arob-mobile.css";   // ← add this line
import Arob_heroSection from "./Arob_heroSection/Arob_heroSection.jsx";
import ArobAboutSection from "./ArobAboutSection/ArobAboutSection.jsx";
import VisionMessageContainter from "./ArobAboutSection/VisionMessageContainter.jsx";
import TeamLayout from "./TeamSection/TeamLayout.jsx";
import Services from "./Services/Services.jsx";
import Clients from "./Clients/Clients.jsx";



function ArobPage() {
    return (
        <main className="arob-page" id="home">
            <Arob_heroSection />

            <div className="arob-Aboutas-team-contaniner">

                <div className="arob-pattern-content">
                    <div className="arob-pattern-background" aria-hidden="true">
                        <div className="arob-pattern-row">
                            {Array.from({ length: 3 }, (_, i) => (
                                <span className="arob-pattern-unit" key={i} />
                            ))}
                        </div>
                    </div>

                    <div className="arob-pattern-sections">
                        <ArobAboutSection />
                        <VisionMessageContainter/>
                    </div>
                </div>

                <div className="arob-next-section">
                    <TeamLayout/>
                </div>
                <Services/>
                <Clients/>
            </div>
        </main>
    );
}

export default ArobPage;
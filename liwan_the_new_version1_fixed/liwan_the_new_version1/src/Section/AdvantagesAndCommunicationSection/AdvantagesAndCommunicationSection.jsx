import "./AdvantagesAndCommunicationSection.css"
import { useTranslation } from "react-i18next";
import Advantage from "../../Components/Advantage/Advantage.jsx";
import clock from "../../assets/clock.png";
import location from "../../assets/location.png"
import disability from "../../assets/disability.png"
import parking from "../../assets/parking.png"
import inspring from "../../assets/inspiring.png"
import LiwanPattern from "../../assets/LiwanPattern.png"
import Contact from "../../Components/Contact/Contact.jsx";
import Liwan_contact_logo from "../../assets/Liwan_contact_logo.png"
import parking_hover from "../../assets/parking_hover.png"
import disability_hover from "../../assets/disability_hover.png"
import light_hover from "../../assets/light_hover.png"
import location_hover from "../../assets/location_hover.png"
import clock_hover from "../../assets/clock_hover.png"
import view_hover from "../../assets/view_hover.png"
import view from "../../assets/view.png"
function AdvantagesAndCommunicationSection() {
    const { t } = useTranslation();
    return (
        <section className="AdvantagesAndCommunicationSection" id="about">

            <p className="advantages-title">{t("advantages.title")}</p>

            <div className={"advantages-container"} id="advantages">
                <Advantage title={t("advantages.items.0.title")} description={t("advantages.items.0.description")} icon={view_hover} hoverIcon={view}/>
                <Advantage title={t("advantages.items.1.title")} description={t("advantages.items.1.description")} icon={location_hover} hoverIcon={location} />
                <Advantage title={t("advantages.items.2.title")} description={t("advantages.items.2.description")} icon={clock_hover} hoverIcon={clock}/>

                <Advantage title={t("advantages.items.3.title")} description={t("advantages.items.3.description")} icon={parking_hover} hoverIcon={parking} />
                <Advantage title={t("advantages.items.4.title")} description={t("advantages.items.4.description")} icon={light_hover} hoverIcon={inspring} />
                <Advantage title={t("advantages.items.5.title")} description={t("advantages.items.5.description")} icon={disability_hover} hoverIcon={disability}/>

            </div>

            <img className={"advantagespattern"} src={LiwanPattern} alt="pattern" />
            <div className={"contact_section_holder"} id="contact">
                <Contact/>
            </div>
            <div className={"Liwan_title_logo_container"}>
            <p className={"Liwan_contact_title"}>
                {t("advantages.joinTitle")}
            </p>

            <img className={"Liwan_contact_logo"} src={Liwan_contact_logo}/>
            </div>


        </section>
    )

}

export default AdvantagesAndCommunicationSection;
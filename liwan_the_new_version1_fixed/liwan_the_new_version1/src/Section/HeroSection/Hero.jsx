import "./Hero.css";
import herophotoIpad from "../../assets/hero_section_photo_ipad.png";
import cornerPattern from "../../assets/corner_pattern.png";
import herophotodesktop from "../../assets/hero_section_photo_desktop.png";
import liwan_logo from "../../assets/liwan_logo.png";
import Button from "../../Components/Button.jsx";
import { useTranslation } from "react-i18next";

function Hero() {
    const { t } = useTranslation();
    return (
        <section className="Hero" id="home">
            <picture>
                <source
                    media="(max-width: 1025px)"
                    srcSet={herophotoIpad}
                />

                <img
                    src={herophotodesktop}
                    alt="hero section photo"
                    className="hero_photo"
                />
            </picture>
            <img src={cornerPattern} alt="corner pattern" className="corner_pattern"/>
            <div className="Hero_main_section">
                <div className="hero_content">
                    <img src={liwan_logo} alt={"liwan logo"} className="liwan_logo"/>
                    <p className="hero_description">{t("hero.description")}</p>
                </div>

                <div className="button_section">
                    <Button className="conection_button"

                            onClick={() => {
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                            }}
                    >
                        <span className="connection_arrow">←</span>
                        <span>{t("hero.contactButton")}</span>
                    </Button>
                    <Button className="service_button"
                            onClick={() => {
                                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                            }}

                    >{t("hero.servicesButton")}</Button>

                </div>

            </div>
        </section>
    );
}

export default Hero;
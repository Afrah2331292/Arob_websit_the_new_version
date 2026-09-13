import servicesImage from "../../assets/Service_background.png";
import servicesImagePhone from "../../assets/Service_background_phone_responsive.png"
import "./services.css";
import servicestitle from "../../assets/service_title.png";
import Button from "../../Components/Button.jsx";
import work_space_icon from "../../assets/work_space_icon.png";
import ServiceHolder from "../../Components/serviceholder/serviceholder.jsx";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import secretaryIcon from "../../assets/secretary.png";
import internalPhoneIcon from "../../assets/phone_icon.png";
import printingIcon from "../../assets/printer_icon.png";
import connectionIcon from "../../assets/connection-icon.png";
import screen_icon from "../../assets/screen_icon.png";
import target_icon from "../../assets/target_icon.png";
import wifi from "../../assets/wifi.png"
import ligth from "../../assets/light.png"
import cafe from "../../assets/cafe.png"
import LiwanPattern from "../../assets/LiwanPattern.png"

function Services() {

    const { t,i18n } = useTranslation();
    const servicesRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: servicesRef,
        offset: ["start start", "end end"]
    });

    const listY = useTransform(
        scrollYProgress,
        [0, 1],
        ["0vh", "-210vh"]
    );

    return (
        <section
            ref={servicesRef}
            className="Services"
            id="services"
        >

            <div className="services-sticky">
                <img
                    className="LiwanPattern"
                    src={LiwanPattern}
                    alt=""
                />

                <picture>
                    <source
                        media="(max-width: 48rem)"
                        srcSet={servicesImagePhone}
                    />

                    <img
                        className="ServicesImage"
                        src={servicesImage}
                        alt=""
                    />
                </picture>


                <div
                    className={`service-title-container ${
                        i18n.language.startsWith("en") ? "english-layout" : ""
                    }`}
                >
                    {i18n.language.startsWith("ar") ? (
                        <img
                            className="service-title"
                            src={servicestitle}
                            alt={t("services.title")}
                        />
                    ) : (
                        <h2 className="services-english-title">
                            {t("services.title")}
                        </h2>
                    )}


                    <p className="service-description">
                        {t("services.description")}
                    </p>
                    <Button
                        className="service-button"
                        hasArrow={true}

                        onClick={() => {
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        {t("services.contactButton")}
                    </Button>

                </div>


                <motion.div
                    className="services-list-container"
                    style={{ y: listY }}
                >

                    <div className="first-list">
                        <div className="icon_holder_first_list">
                            <img className="work_space_icon"  src={work_space_icon} alt="Work Space Icon" />
                        </div>
                        <p className="first-list-title">{t("services.list1.title")}</p>
                        <ul className="first-list-description">
                            <li>{t("services.list1.items.0")}</li>
                            <li>{t("services.list1.items.1")}</li>
                        </ul>
                    </div>

                    <div className="second-list">
                        <p className="second-list-title">{t("services.list2.title")}</p>

                        <div className="serviceholders-grid-second-list">
                            <ServiceHolder description={t("services.list2.items.0")} icon={secretaryIcon} />
                            <ServiceHolder description={t("services.list2.items.1")} icon={internalPhoneIcon} />
                            <ServiceHolder description={t("services.list2.items.2")} icon={printingIcon} />
                            <ServiceHolder description={t("services.list2.items.3")} icon={connectionIcon} />
                            <ServiceHolder description={t("services.list2.items.4")} icon={screen_icon} />
                            <ServiceHolder description={t("services.list2.items.5")} icon={target_icon} />
                        </div>

                    </div>

                    <div className="third-list">
                        <p className="third-list-title">{t("services.list3.title")}</p>

                        <div className="serviceholders-grid-third-list">
                            <ServiceHolder description={t("services.list3.items.0")} icon={wifi} />
                            <ServiceHolder description={t("services.list3.items.1")} icon={ligth} />
                            <ServiceHolder description={t("services.list3.items.2")} icon={cafe} />


                        </div>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}

export default Services;
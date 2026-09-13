import "./footer.css";
import { useTranslation } from "react-i18next";
import email from "../../assets/email_logo.png"
import phone from "../../assets/phone_icon.png"
import linkedIn from "../../assets/lnkedin_icon.png"
import Whatsapp from "../../assets/whatsapp.png"
import X from "../../assets/X_icon.png"
import insta from "../../assets/instagram.png"
import youtube from "../../assets/youtube.png"
import Arob_logo_White from "../../assets/Aroblogo_white.png"
import MapSection from "../../Components/Map/MapSection.jsx"
import location_icon_buttom from "../../assets/location_orange.png"

function Footer() {
    const { t } = useTranslation();
    return (
        <section className="Footer_container">
            <div className={"Upper_section"}>
                <div className={"contact_section"}>

                    <div className="contact_us">
                        <p className="contact_us_title">
                            {t("footer.contactTitle")}
                        </p>

                        <div className="contact_us_line"></div>
                    </div>


                    <div className={"phone_email_container"}>
                        <div className="contact_us_mail_holder">

                            <div className="mail_icon_holder">
                                <img className={"mail_icon"} src={email}/>
                            </div>

                            <span className="mail-text">
                                                info@arob.com
                                            </span>

                        </div>


                        <div className="contact_us_phone_holder">

                            <div className="phone_icon_holder">
                                <img className={"phone_icon"} src={phone}/>
                            </div>

                            <span className="phone-text">
                                                +966 12 535 3111
                                            </span>
                        </div>

                    </div>


                    <div className={"first_section_to_right_line"}/>


                    <div className="follow_us">
                        <p className="folllow_us_title">
                            {t("footer.followTitle")}
                        </p>

                        <div className="follow_us_line"></div>
                    </div>

                    <div className="social_Media">

                        <a
                            className="linkedIn_icon_holder"
                            href="https://www.linkedin.com/company/arob-business/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="LinkedIn_icon"
                                src={linkedIn}
                                alt="LinkedIn"
                            />
                        </a>


                        <a
                            className="X_icon_holder"
                            href="https://x.com/arob_business?s=21"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="X_icon"
                                src={X}
                                alt="X"
                            />
                        </a>
                        <a
                            className="youTube_icon_holder"
                            href="http://www.youtube.com/@arob_business/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="youtube_icon"
                                src={youtube}
                                alt="LinkedIn"
                            />
                        </a>


                        <a
                            className="Whatsapp_icon_holder"
                            href="https://api.whatsapp.com/send/?phone=966125353111&text&type=phone_number&app_absent=0&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZBAxMjE3OTgxNjQ0ODc5NjI4AAGno6dcs6S_J4V49J4ZbncsQxoy23RG7BFG2zdcASNZka_WGx6DI_6fUFzIaUo_aem_lsdeU_mce0x8cR0HjQPgGg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="Whatsapp_icon"
                                src={Whatsapp}
                                alt="WhatsApp"
                            />
                        </a>


                        <a
                            className="Instagram_icon_holder"
                            href="https://www.instagram.com/arob_business?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="Instagram_icon"
                                src={insta}
                                alt="Instagram"
                            />
                        </a>




                    </div>



                </div>


                <div className={"first_section_separator_line"}/>


                <div className={"Arob_section"}>
                    <div className={"Aroblogo_line_container"}>
                        <img className={"Arob_logo_White"} src={Arob_logo_White}/>
                        <div className="Arob_line"></div>
                    </div>
                    <p className={"Arob_buttom_description"}>
                        {t("footer.companyDescription")}
                    </p>
                </div>

                <div className={"second_section_separator_line"}/>


                <div className={"location_section"}>
                    <div className="map_wrapper">
                        <MapSection/>
                    </div>
                    <div className={"location_title_container"}>
                        <div className={"location_icon_holder"}>
                            <img className={"location_icon_buttom"} src={location_icon_buttom}/>
                        </div>

                        <div className={"location_title_description"}>
                            <p className={"location_title"}>{t("footer.locationTitle")}</p>
                            <p className={"location_description"}>{t("footer.locationDescription")}</p>
                        </div>

                    </div>
                </div>
                <div className={"footer_line"}></div>
            </div>



            <div className={"Lower_section"}>
                <p className={"copy_right_sentence"}>{t("footer.copyright")}</p>
                <p className={"copyright"}> {t("footer.developedBy")} </p>

            </div>


        </section>
    );
}

export default Footer;
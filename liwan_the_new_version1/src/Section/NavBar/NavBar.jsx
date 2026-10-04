import "./NavBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "../../Components/Dropdown/Dropdown.jsx";
import Arob_colorful_logo from "../../assets/Arob_colorful_logo.png"

function NavBar({ variant = "liwan" }) {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > window.innerHeight / 4);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section
            className={`NavBar_holder NavBar_holder--${variant} ${
                scrolled ? "scrolled" : ""
            }`}
        >
            <nav
                id="main-navigation"
                className={`navbar ${mobileMenuOpen ? "mobile-open" : ""}`}
                onClick={(event) => {
                    if (event.target.closest("a")) {
                        setMobileMenuOpen(false);
                    }
                }}
            >
                <a href="#contact" className="nav-link">
                    {t("nav.contact")}
                </a>

                <a href="#blog" className="nav-link">
                    {t("nav.blog")}
                </a>

                <Dropdown
                    mobileMenuOpen={mobileMenuOpen}
                    title={t("nav.liwan")}
                    titleLink="/liwan"
                    titleClassName="nav-link"
                    items={[
                        {
                            name: t("nav.discoverLiwan"),
                            link: "/liwan#discoverLiwan"
                        },
                        {
                            name: t("nav.servicesLiwan"),
                            link: "/liwan#services"
                        },
                        {
                            name: t("nav.advantagesLiwan"),
                            link: "/liwan#advantages"
                        },
                        {
                            name: t("nav.contact"),
                            link: "/liwan#contact"
                        }
                    ]}
                />

                <Link to="/#services" className="nav-link">
                    {t("nav.services")}
                </Link>

                <Link to="/#about" className="nav-link">
                    {t("nav.about")}
                </Link>

                <Link to="/" className="nav-link">
                    {t("nav.home")}
                </Link>
            </nav>

            <div className={"Arob_logo_container"}>
                <img src={Arob_colorful_logo} />
            </div>

            <button
                className={"button"}
                onClick={() => {
                    const newLang = i18n.language === "ar" ? "en" : "ar";
                    i18n.changeLanguage(newLang);
                    setMobileMenuOpen(false);
                }}
            >
                {i18n.language === "ar" ? "English" : "عربي"}
            </button>

            <button
                type="button"
                className={`mobile-menu-toggle ${mobileMenuOpen ? "is-open" : ""}`}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-controls="main-navigation"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            >
                <span />
                <span />
                <span />
            </button>
        </section>
    );
}

export default NavBar;
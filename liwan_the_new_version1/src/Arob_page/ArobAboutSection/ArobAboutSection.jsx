import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ArobAboutSection.css";
import StatCard from "../../Components/StatCard/StatCard.jsx";
import ArobDecoration from "../../ArobAssets/ArobDecoration.png";
import AboutImage from "../../ArobAssets/AboutImage.png";

function ArobAboutSection() {
    const { t, i18n } = useTranslation("arob");

    const contentRef = useRef(null);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowContent(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="arob-about-section" id="about">
            <div className="about-container">
                <div
                    ref={contentRef}
                    dir={i18n.dir()}
                    className={`about-content reveal-up ${
                        showContent ? "visible" : ""
                    }`}
                >
                    <span className="about-label">
                        {t("about.label")}
                    </span>

                    <h2>
                        {t("about.title")}
                        <span className="about-question-mark">
                            {t("about.questionMark")}
                        </span>
                    </h2>

                    <p className="about-description">
                        {t("about.description")}
                    </p>

                    <div className="about-stats">
                        <StatCard
                            text={t("about.investment")}
                            value={10}
                            suffix="M+"
                        />

                        <StatCard
                            text={t("about.projects")}
                            value={150}
                            suffix="+"
                        />
                    </div>
                </div>

                <div
                    className={`about-media reveal-up ${
                        showContent ? "visible" : ""
                    }`}
                >
                    <img
                        className="about-decoration"
                        src={ArobDecoration}
                        alt=""
                        aria-hidden="true"
                    />

                    <div className="about-photo">
                        <img
                            className="about-image"
                            src={AboutImage}
                            alt={t("about.imageAlt")}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ArobAboutSection;
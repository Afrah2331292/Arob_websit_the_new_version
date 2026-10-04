import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ArobAboutSection.css";
import vision_logo from "../../ArobAssets/vision_logo.png";
import Message_logo from "../../ArobAssets/Message_logo.png";
import OurValue_logo from "../../ArobAssets/OurValue_logo.png";

function VisionMessageContainter() {
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
            { threshold: 0.5 }
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={contentRef}
            className={`purpose-section reveal-up ${
                showContent ? "visible" : ""
            }`}
            dir={i18n.dir()}
        >
            <h2 className="purpose-title">
                {t("purpose.title")}
            </h2>

            <div className="purpose-cards">
                <article className="purpose-card-mission-card">
                    <img
                        src={Message_logo}
                        alt=""
                        aria-hidden="true"
                        className="purpose-logo"
                    />

                    <h3>{t("purpose.missionTitle")}</h3>

                    <p style={{ whiteSpace: "pre-line" }}>
                        {t("purpose.missionDescription")}
                    </p>
                </article>

                <article className="purpose-card-vision-card">
                    <img
                        src={vision_logo}
                        alt=""
                        aria-hidden="true"
                        className="purpose-logo"
                    />

                    <h3>{t("purpose.visionTitle")}</h3>

                    <p style={{ whiteSpace: "pre-line" }}>
                        {t("purpose.visionDescription")}
                    </p>
                </article>

                <article className="purpose-card values-card">
                    <img
                        src={OurValue_logo}
                        alt=""
                        aria-hidden="true"
                        className="purpose-logo"
                    />

                    <h3>{t("purpose.valuesTitle")}</h3>

                    <p style={{ whiteSpace: "pre-line" }}>
                        {t("purpose.valuesDescription")}
                    </p>
                </article>
            </div>
        </section>
    );
}

export default VisionMessageContainter;
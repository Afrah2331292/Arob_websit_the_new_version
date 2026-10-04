import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Arob_heroSection.css";
import ArobVideo from "../../assets/ArobVideo.mp4";

function ArobHeroSection() {
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
        <section className="arob-hero-section">
            <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={ArobVideo} type="video/mp4" />
            </video>

            <div
                ref={contentRef}
                dir={i18n.dir()}
                className={`hero-content reveal-up ${
                    showContent ? "visible" : ""
                }`}
            >
                <h1>{t("hero.title")}</h1>

                <p>{t("hero.description")}</p>
            </div>
        </section>
    );
}

export default ArobHeroSection;
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Services.css";
import ServicesCorner from "../../ArobAssets/cornerDecortation.png";

const services = [
    { number: "01" },
    { number: "02" },
    { number: "03" },
    { number: "04" },
    { number: "05" },
    { number: "06" },
    { number: "07" },
];

/* انتقال اللون بين الأرقام عند ظهور الطبقة لأول مرة */
function useServiceHighlight(panelRef, firstNumber, lastNumber) {
    const [activeNumber, setActiveNumber] = useState(firstNumber);

    useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return;

        let intervalId;
        let currentNumber = firstNumber;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                observer.disconnect();

                intervalId = window.setInterval(() => {
                    currentNumber += 1;
                    setActiveNumber(currentNumber);

                    if (currentNumber >= lastNumber) {
                        window.clearInterval(intervalId);
                    }
                }, 900);
            },
            { threshold: 0.9 }
        );

        observer.observe(panel);

        return () => {
            observer.disconnect();
            window.clearInterval(intervalId);
        };
    }, [panelRef, firstNumber, lastNumber]);

    return String(activeNumber).padStart(2, "0");
}

/* بطاقة الخدمة: ترث اتجاهها من الحاوية الرئيسية */
function ServiceCard({ service, isActive }) {
    const { t } = useTranslation("arob");

    return (
        <article
            className={`service-card ${
                service.number === "07" ? "service-card--wide" : ""
            }`}
        >
            <span
                className={`service-number ${
                    isActive ? "service-number--green" : ""
                }`}
                dir="ltr"
                aria-hidden="true"
            >
                {service.number}
            </span>

            <div className="service-text">
                <span
                    className={`service-line ${
                        isActive ? "service-line--active" : ""
                    }`}
                    aria-hidden="true"
                />

                <h3>
                    {t(`services.items.${service.number}.title`)}
                </h3>

                <p>
                    {t(`services.items.${service.number}.description`)}
                </p>
            </div>
        </article>
    );
}

function Services() {
    const { t, i18n } = useTranslation("arob");

    const firstPanelRef = useRef(null);
    const secondPanelRef = useRef(null);

    const firstContentRef = useRef(null);
    const secondContentRef = useRef(null);

    const [showFirstContent, setShowFirstContent] = useState(false);
    const [showSecondContent, setShowSecondContent] = useState(false);

    /* ظهور محتوى كل طبقة مرة واحدة */
    useEffect(() => {
        const firstContent = firstContentRef.current;
        const secondContent = secondContentRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    if (entry.target === firstContent) {
                        setShowFirstContent(true);
                    }

                    if (entry.target === secondContent) {
                        setShowSecondContent(true);
                    }

                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.05 }
        );

        if (firstContent) {
            observer.observe(firstContent);
        }

        if (secondContent) {
            observer.observe(secondContent);
        }

        return () => observer.disconnect();
    }, []);

    /* الجزء الأول: 01 ثم 02 ثم 03 ويثبت عند 04 */
    const firstActiveNumber = useServiceHighlight(
        firstPanelRef,
        1,
        4
    );

    /* الجزء الثاني: 05 ثم 06 ويثبت عند 07 */
    const secondActiveNumber = useServiceHighlight(
        secondPanelRef,
        5,
        7
    );

    return (
        <section
            className="services-stack"
            dir={i18n.dir()}
            aria-labelledby="services-title"
            id="services"
        >
            {/* الطبقة الأولى */}
            <div
                ref={firstPanelRef}
                className="services-panel services-panel--first"
            >
                <img
                    src={ServicesCorner}
                    className="services-corner"
                    alt=""
                    aria-hidden="true"
                />

                <img
                    src={ServicesCorner}
                    className="services-corner services-corner--opposite"
                    alt=""
                    aria-hidden="true"
                />

                <div
                    ref={firstContentRef}
                    className={`services-content services-reveal ${
                        showFirstContent ? "visible" : ""
                    }`}
                >
                    <h2 id="services-title">
                        {t("services.title")}
                    </h2>

                    <div className="services-grid">
                        {services.slice(0, 4).map((service) => (
                            <ServiceCard
                                key={service.number}
                                service={service}
                                isActive={
                                    service.number === firstActiveNumber
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* الطبقة الثانية */}
            <div
                ref={secondPanelRef}
                className="services-panel services-panel--second"
            >
                <img
                    src={ServicesCorner}
                    className="services-corner"
                    alt=""
                    aria-hidden="true"
                />

                <img
                    src={ServicesCorner}
                    className="services-corner services-corner--opposite"
                    alt=""
                    aria-hidden="true"
                />

                <div
                    ref={secondContentRef}
                    className={`services-content services-reveal ${
                        showSecondContent ? "visible" : ""
                    }`}
                >
                    <div className="services-grid">
                        {services.slice(4).map((service) => (
                            <ServiceCard
                                key={service.number}
                                service={service}
                                isActive={
                                    service.number === secondActiveNumber
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
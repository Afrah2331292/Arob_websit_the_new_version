import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import BoardPage from "./BoardPage.jsx";
import TeamPage from "./TeamPage.jsx";
import "./TeamLayout.css";

function TeamLayout() {
    const { t, i18n } = useTranslation("arob");

    const [activeTab, setActiveTab] = useState("board");
    const [showContent, setShowContent] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowContent(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="team-layout"
            dir={i18n.dir()}
        >
            <div
                className="team-layout__left-shape"
                aria-hidden="true"
            />

            <div
                className="team-layout__right-pattern"
                aria-hidden="true"
            />

            <div
                className={`team-layout__content team-layout-reveal ${
                    showContent ? "visible" : ""
                }`}
            >
                <header>
                    <h1>
                        {activeTab === "board"
                            ? t("team.leadershipTitle")
                            : t("team.teamTitle")}
                    </h1>

                    <p>{t("team.description")}</p>
                </header>

                <div className="team-layout__tabs">
                    <button
                        type="button"
                        className={`team-tab ${
                            activeTab === "board" ? "active" : ""
                        }`}
                        aria-pressed={activeTab === "board"}
                        onClick={() => setActiveTab("board")}
                    >
                        {t("team.boardTab")}
                    </button>

                    <button
                        type="button"
                        className={`team-tab ${
                            activeTab === "team" ? "active" : ""
                        }`}
                        aria-pressed={activeTab === "team"}
                        onClick={() => setActiveTab("team")}
                    >
                        {t("team.teamTab")}
                    </button>
                </div>

                {activeTab === "board" ? (
                    <BoardPage />
                ) : (
                    <TeamPage />
                )}
            </div>
        </section>
    );
}

export default TeamLayout;
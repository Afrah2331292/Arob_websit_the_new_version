import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PhotoHolder from "../../Components/PhotoHolder/PhotoHolder.jsx";
import { boardMembers } from "./BoardPage.js";

function BoardPage() {
    const { t, i18n } = useTranslation("arob");

    const isEnglish = (
        i18n.resolvedLanguage || i18n.language
    ).startsWith("en");

    const sectionRef = useRef(null);
    const [showContent, setShowContent] = useState(false);

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
            { threshold: 0.15 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-label={t("team.boardTab")}
            className={`board-page-reveal ${
                showContent ? "visible" : ""
            }`}
        >
            <div className="team-layout__cards">
                {boardMembers.map((member) => (
                    <PhotoHolder
                        key={member.id}
                        image={member.image}
                        name={
                            isEnglish
                                ? member.nameEn || member.name
                                : member.name
                        }
                        jobTitle={
                            isEnglish
                                ? member.jobTitleEn || member.jobTitle
                                : member.jobTitle
                        }
                        linkedinUrl={member.linkedinUrl}
                    />
                ))}
            </div>

            <blockquote className="team-layout__quote">
                <span aria-hidden="true">”</span>

                <p>{t("team.quote")}</p>
            </blockquote>
        </section>
    );
}

export default BoardPage;
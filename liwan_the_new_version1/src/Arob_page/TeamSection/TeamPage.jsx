import { useState } from "react";
import PhotoHolder from "../../Components/PhotoHolder/PhotoHolder.jsx";
import { teamMembers } from "./TeamPage.js";
import "./TeamPage.css";

function TeamPage() {
    const [page, setPage] = useState(0);
    const [slideFrom, setSlideFrom] = useState("25px");

    const peoplePerPage = 14;
    const totalPages = Math.ceil(teamMembers.length / peoplePerPage);
    const lastPage = Math.max(0, totalPages - 1);

    const visibleMembers = teamMembers.slice(
        page * peoplePerPage,
        (page + 1) * peoplePerPage
    );

    function nextPage() {
        setSlideFrom("25px");
        setPage((current) => Math.min(current + 1, lastPage));
    }

    function previousPage() {
        setSlideFrom("-25px");
        setPage((current) => Math.max(current - 1, 0));
    }

    return (
        <section aria-label="الفريق">
            <div className="team-carousel">
                {/* الزر الموجود على اليسار */}
                <button
                    type="button"
                    className="team-carousel__arrow"
                    onClick={previousPage}
                    disabled={page === 0}
                    aria-label="المجموعة السابقة"
                >
                    ❮
                </button>

                <div className="team-carousel__viewport">
                    <div
                        key={page}
                        className="team-carousel__grid"
                        style={{ "--slide-from": slideFrom }}
                    >
                        {visibleMembers.map((member) => (
                            <PhotoHolder
                                key={member.id}
                                image={member.image}
                                name={member.name}
                                jobTitle={member.jobTitle}
                                linkedinUrl={member.linkedinUrl}
                            />
                        ))}
                    </div>
                </div>

                {/* الزر الموجود على اليمين */}
                <button
                    type="button"
                    className="team-carousel__arrow"
                    onClick={nextPage}
                    disabled={page === lastPage}
                    aria-label="المجموعة التالية"
                >
                    ❯
                </button>
            </div>

            <p className="team-carousel__counter" aria-live="polite">
                {totalPages > 0 ? page + 1 : 0} / {totalPages}
            </p>
        </section>
    );
}

export default TeamPage;
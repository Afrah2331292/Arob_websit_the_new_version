import "./PhotoHolder.css";

function PhotoHolder({ image, name, jobTitle }) {
    return (
        <div className="team-card" tabIndex={0}>
            <div className="team-card__surface">
                <span className="team-card__corner" aria-hidden="true" />
                <span className="team-card__paper" aria-hidden="true" />

                <div className="team-card__portrait-area">
                    <img
                        className="team-card__portrait"
                        src={image}
                        alt={name}
                    />
                </div>

                <div className="team-card__info" dir="rtl">
                    <h3>{name}</h3>
                    <p>{jobTitle}</p>
                </div>
            </div>
        </div>
    );
}

export default PhotoHolder;
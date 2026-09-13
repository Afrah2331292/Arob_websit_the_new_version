import "./Advantage.css"

function Advantage({ title, description, icon, hoverIcon }) {
    return (
        <div className="advantge" style={{
            width: "18.472vw",  /* 266px */
            height: "10vw"      /* 144px */
        }}>
            <img className="advantge-icon advantge-icon-default" src={icon} alt="" />
            {hoverIcon && (
                <img className="advantge-icon advantge-icon-hover" src={hoverIcon} alt="" />
            )}

            <p className="advantge-title">{title}</p>

            <div className="advantage-line" />

            <p className="advantge-description">{description}</p>
        </div>
    )
}

export default Advantage;
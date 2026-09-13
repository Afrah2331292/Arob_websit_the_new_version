import "./serviceholder.css";

function ServiceHolder({ description, icon }) {
    return (
        <div className="serviceholder">
            <div className="service-icon">
                <img className="service-icon-img" src={icon} alt="" />
            </div>

            <p className="Service-description">
                {description}
            </p>
        </div>
    );
}

export default ServiceHolder;
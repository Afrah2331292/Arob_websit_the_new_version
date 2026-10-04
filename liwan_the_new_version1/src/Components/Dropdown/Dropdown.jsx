import "./Dropdown.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dropdown({
                      title,
                      items,
                      titleClassName,
                      mobileMenuOpen,
                      titleLink,
                  }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const [previousMobileMenuOpen, setPreviousMobileMenuOpen] =
        useState(mobileMenuOpen);

    if (previousMobileMenuOpen !== mobileMenuOpen) {
        setPreviousMobileMenuOpen(mobileMenuOpen);

        if (!mobileMenuOpen) {
            setDropdownOpen(false);
        }
    }

    return (
        <div className={`dropdown ${dropdownOpen ? "is-open" : ""}`}>
            <button
                type="button"
                className={`dropdown-title ${titleClassName || ""}`}
                aria-expanded={dropdownOpen}
                onClick={() => {
                    if (titleLink) {
                        navigate(titleLink);
                    }

                    setDropdownOpen((isOpen) => !isOpen);
                }}
            >
                <span className="arrow">⌄</span>
                <span>{title}</span>
            </button>

            <div className="dropdown-menu">
                {items.map((item, index) =>
                    item.link ? (
                        <Link
                            to={item.link}
                            key={index}
                            onClick={() => setDropdownOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ) : (
                        <span className="disabled-link" key={index}>
                            {item.name}
                        </span>
                    )
                )}
            </div>
        </div>
    );
}

export default Dropdown;
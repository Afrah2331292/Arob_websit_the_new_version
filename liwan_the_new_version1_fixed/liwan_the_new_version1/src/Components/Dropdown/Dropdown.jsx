import "./Dropdown.css";
import { useEffect, useState } from "react";

function Dropdown({
                      title,
                      items,
                      titleClassName,
                      mobileMenuOpen
                  }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (!mobileMenuOpen) {
            setDropdownOpen(false);
        }
    }, [mobileMenuOpen]);

    return (
        <div className={`dropdown ${dropdownOpen ? "is-open" : ""}`}>
            <button
                type="button"
                className={`dropdown-title ${titleClassName || ""}`}
                aria-expanded={dropdownOpen}
                onClick={() => {
                    setDropdownOpen((isOpen) => !isOpen);
                }}
            >
                <span className="arrow">⌄</span>
                <span>{title}</span>
            </button>

            <div className="dropdown-menu">
                {items.map((item, index) =>
                    item.link ? (
                        <a
                            href={item.link}
                            key={index}
                            onClick={() => setDropdownOpen(false)}
                        >
                            {item.name}
                        </a>
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
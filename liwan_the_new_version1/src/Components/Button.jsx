import "./Button.css"
function Button({ children, className, hasArrow = false, onClick }) {
    return (
        <button
            className={className}
            onClick={onClick}
            style={{
                width: "13.6875rem",
                height: "2.75rem",
                borderRadius: "0.9375rem",
                position: "relative",
                color: "white"
            }}
        >
            {children}

            {hasArrow && (
                <span
                    className={"arrow_white"}
                    style={{
                        position: "absolute",
                        left: "2.2rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "white",
                        fontSize: "1.5rem",
                        zIndex: 9999,

                    }}
                >
                    ←
                </span>
            )}
        </button>
    );
}

export default Button;
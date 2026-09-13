import "./FormInput.css";

function FormInput({
                       name,
                       label,
                       placeholder,
                       value,
                       onChange,
                       type = "text",
                       required = false,
                       error = ""
                   }) {
    return (
        <div className="form_input">

            <p className="conact_title">
                {required && (
                    <span className="required-star">*</span>
                )}

                {label}
            </p>

            <input
                className="input_name"
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />

            {error && (
                <p className="input_error">
                    {error}
                </p>
            )}

        </div>
    );
}

export default FormInput;
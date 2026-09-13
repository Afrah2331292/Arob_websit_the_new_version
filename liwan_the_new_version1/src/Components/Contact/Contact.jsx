import { useState } from "react";
import "./Contact.css";
import { useTranslation } from "react-i18next";
import FormInput from "../Form/FormInput.jsx";

const WORKER_URL = "https://liwan-form-handler.afrahjk3.workers.dev";

function Contact() {

    const { t } = useTranslation();
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        phone: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(""); // "success" | "error" | ""
    const [submitMessage, setSubmitMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === "email") {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            setErrors({
                ...errors,
                email: value && !emailRegex.test(value)
                    ? t("contact.emailError")
                    : ""
            });
        }

        if (name === "phone") {

            const phoneRegex = /^05\d{8}$/;

            setErrors({
                ...errors,
                phone: value && !phoneRegex.test(value)
                    ? t("contact.phoneError")
                    : ""
            });
        }
    };



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "image/jpeg",
            "image/png"
        ];

        setFileError("");

        if (!allowedTypes.includes(selectedFile.type)) {
            setFileError(t("contact.fileTypeError"));
            e.target.value = "";
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setFileError(t("contact.fileSizeError"));
            e.target.value = "";
            return;
        }

        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // basic required-field check
        if (!formData.name || !formData.email || !formData.phone) {
            setSubmitStatus("error");
            setSubmitMessage(t("contact.requiredFieldsError"));
            return;
        }

        if (errors.email || errors.phone) {
            setSubmitStatus("error");
            setSubmitMessage(t("contact.validationError"));
            return;
        }

        setSubmitting(true);
        setSubmitStatus("");
        setSubmitMessage("");

        try {
            const dataToSend = new FormData();
            dataToSend.append("name", formData.name);
            dataToSend.append("email", formData.email);
            dataToSend.append("phone", formData.phone);
            if (file) {
                dataToSend.append("file", file);
            }

            const response = await fetch(WORKER_URL, {
                method: "POST",
                body: dataToSend,
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitStatus("success");
                setSubmitMessage(t("contact.successMessage"));
                setFormData({ name: "", email: "", phone: "" });
                setFile(null);
            } else {
                setSubmitStatus("error");
                setSubmitMessage(t("contact.submitErrorMessage"));
            }
        } catch{
            setSubmitStatus("error");
            setSubmitMessage(t("contact.networkErrorMessage"));
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <section className="formpaper">

            <form onSubmit={handleSubmit}>

                <div className="input_container">

                    <FormInput
                        label={t("contact.nameLabel")}
                        placeholder={t("contact.namePlaceholder")}
                        required={true}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <FormInput
                        label={t("contact.emailLabel")}
                        placeholder={t("contact.emailPlaceholder")}
                        required={true}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <FormInput
                        label={t("contact.phoneLabel")}
                        placeholder={t("contact.phonePlaceholder")}
                        required={true}
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />


                    <div className="file_container">

                        <p className="conact_title">
                            {t("contact.fileLabel")}
                        </p>
                        <label className="file_input">

                            <p className="file_description">
                                {t("contact.fileDragText")}
                            </p>

                            {!file ? (
                                <span className="file_button">
                                                {t("contact.fileChooseButton")}
                                        </span>
                            ) : (
                                <span className="file_button file_uploaded">
                                            {t("contact.fileUploadedButton")}
                                        </span>
                            )}

                            <input
                                type="file"
                                name="attachment"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                            />

                            <div className="file_type_container">

                                <p className="filetype">
                                    {t("contact.fileTypeText")}
                                </p>

                                <p className="filesize">
                                    {t("contact.fileSizeText")}
                                </p>

                            </div>

                        </label>

                        {fileError && (
                            <p className="file-error">
                                {fileError}
                            </p>
                        )}

                    </div>

                    {submitMessage && (
                        <p className={submitStatus === "success" ? "submit-success" : "submit-error"}>
                            {submitMessage}
                        </p>
                    )}

                    <button type="submit" className="Submit_button" disabled={submitting}>
                        {submitting ? t("contact.submittingButton") : t("contact.submitButton")}
                    </button>

                </div>

            </form>

        </section>
    );
}

export default Contact;
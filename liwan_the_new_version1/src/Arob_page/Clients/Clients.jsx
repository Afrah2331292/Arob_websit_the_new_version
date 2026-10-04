import { useTranslation } from "react-i18next";
import "./Clients.css";

/* قراءة لوقوهات العملاء من المجلد */
const logoFiles = import.meta.glob(
    "/src/ArobAssets/clients/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}",
    {
        eager: true,
        query: "?url",
        import: "default",
    }
);

/* ترتيب الصور حسب اسم الملف */
const clientLogos = Object.entries(logoFiles)
    .sort(([firstPath], [secondPath]) =>
        firstPath.localeCompare(secondPath, undefined, {
            numeric: true,
        })
    )
    .map(([path, src], index) => {
        const name = path
            .split("/")
            .pop()
            .replace(/\.[^.]+$/, "")
            .replace(/^\d+[-_\s]*/, "")
            .replace(/[-_]/g, " ");

        return {
            id: path,
            src,
            name,
            number: index + 1,
        };
    });

const firstRow = clientLogos.slice(0, 16);
const secondRow = clientLogos.slice(16, 33);

function ClientsRow({ logos, direction }) {
    const { t } = useTranslation("arob");

    return (
        <div className="clients-marquee">
            <div
                className={`clients-track clients-track--${direction}`}
            >
                {/* نسختان متطابقتان لاستمرار الحركة */}
                {[0, 1].map((copy) => (
                    <div
                        key={copy}
                        className="clients-group"
                        aria-hidden={copy === 1 ? true : undefined}
                    >
                        {logos.map((logo) => (
                            <div
                                className="clients-logo"
                                key={logo.id}
                            >
                                <img
                                    src={logo.src}
                                    alt={
                                        copy === 0
                                            ? logo.name ||
                                            t("clients.logoAlt", {
                                                number: logo.number,
                                            })
                                            : ""
                                    }
                                    draggable={false}
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Clients() {
    const { t, i18n } = useTranslation("arob");

    return (
        <section
            className="clients-section"
            dir={i18n.dir()}
            aria-labelledby="clients-title"
        >
            <div className="clients-heading">
                <h2 id="clients-title">
                    {t("clients.title")}
                </h2>

                <span aria-hidden="true" />
            </div>

            <div className="clients-rows">
                <ClientsRow
                    logos={firstRow}
                    direction="right"
                />

                <ClientsRow
                    logos={secondRow}
                    direction="left"
                />
            </div>
        </section>
    );
}

export default Clients;
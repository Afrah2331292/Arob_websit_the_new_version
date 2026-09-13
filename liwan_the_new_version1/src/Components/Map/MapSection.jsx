import "./MapSection.css";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import {
    Map,
    Marker,
    setWorkerUrl,
    setRTLTextPlugin
} from "maplibre-gl";

import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import "@fontsource/cairo/400.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";

import "maplibre-gl/dist/maplibre-gl.css";

import mapStyle from "../../styles/dark-matter-cairo.json";

setWorkerUrl(workerUrl);

// =========================================
// دعم اللغة العربية
// =========================================

setRTLTextPlugin(
    "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
    true
);

export default function MapSection() {

    const { t, i18n } = useTranslation();
    const ref = useRef(null);

    useEffect(() => {

        const companyLocation = [
            39.79954602684607,
            21.396461629596974
        ];

        // =========================================
        // تحميل Cairo قبل إنشاء الخريطة
        // =========================================

        document.fonts.load('14px "Cairo"').then(() => {

            // =========================================
            // إنشاء الخريطة
            // =========================================

            const map = new Map({

                container: ref.current,

                style: mapStyle,

                center: companyLocation,

                zoom: 14,

            });

            // =========================================
            // تعديل شكل الخريطة
            // =========================================

            map.on("style.load", () => {

                const layers = map.getStyle().layers;

                layers.forEach((layer) => {

                    // ---------------------------------
                    // نصوص الخريطة
                    // ---------------------------------

                    if (
                        layer.type === "symbol" &&
                        layer.layout &&
                        layer.layout["text-field"]
                    ) {

                        if (layer.paint) {

                            map.setPaintProperty(
                                layer.id,
                                "text-color",
                                "#D6D6D6"
                            );

                        }

                    }

                    // ---------------------------------
                    // الشوارع والطرق
                    // ---------------------------------

                    if (
                        layer.type === "line" &&
                        (
                            layer.id.toLowerCase().includes("road") ||
                            layer.id.toLowerCase().includes("street") ||
                            layer.id.toLowerCase().includes("highway")
                        )
                    ) {

                        map.setPaintProperty(
                            layer.id,
                            "line-color",
                            "#4F5052"
                        );

                    }

                });

            });

            // =========================================
            // Marker الشركة
            // =========================================

            const markerElement = document.createElement("div");

            markerElement.className = "company-marker";

            markerElement.innerHTML = `

                <!-- اسم الشركة -->

                <div class="company-name">
                    ${t("map.companyName")}
                </div>

                <!-- Location Pin -->

                <svg
                    class="company-location-icon"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >

                    <path
                        d="M12 21C12 21 19 14.5 19 8.5C19 4.91 15.87 2 12 2C8.13 2 5 4.91 5 8.5C5 14.5 12 21 12 21Z"
                        fill="#B27245"
                    />

                    <circle
                        cx="12"
                        cy="8.5"
                        r="2.7"
                        fill="#FFFFFF"
                    />

                </svg>

            `;

            // =========================================
            // إضافة Marker للخريطة
            // =========================================

            const marker = new Marker({

                element: markerElement,

                anchor: "bottom",

            })
                .setLngLat(companyLocation)
                .addTo(map);

            // =========================================
            // بوكس عرض الخريطة
            // =========================================

            const mapViewBox = document.createElement("a");
            mapViewBox.href = "https://www.google.com";

            mapViewBox.className = "map-view-box";

            mapViewBox.innerText = t("map.viewMap");
            mapViewBox.target = "_blank";


            const mapViewControl = {

                onAdd() {

                    const container = document.createElement("div");

                    container.className = "map-view-control";

                    container.appendChild(mapViewBox);

                    return container;

                },

                onRemove() {

                    mapViewBox.remove();

                }

            };

            map.addControl(
                mapViewControl,
                "bottom-right"
            );

            // =========================================
            // Events
            // =========================================

            map.on("load", () => {

                console.log("MAP LOADED");

            });

            map.on("error", (e) => {

                console.error(
                    "MAP ERROR:",
                    e
                );

            });

            // =========================================
            // حفظ العناصر
            // =========================================

            ref.current._mapInstance = map;

            ref.current._marker = marker;

        });

        // =========================================
        // Cleanup
        // =========================================

        return () => {

            const map =
                ref.current?._mapInstance;

            const marker =
                ref.current?._marker;

            if (marker) {

                marker.remove();

            }

            if (map) {

                map.remove();

            }

        };

    }, []);

    // 🌐 يراقب تغيير اللغة فقط، ويحدّث نص اسم الشركة ونص "عرض الخريطة"
    // بدون إعادة بناء الخريطة كاملة (لأن بناء الخريطة عملية ثقيلة)
    useEffect(() => {

        const nameEl = ref.current?.querySelector(".company-name");
        if (nameEl) {
            nameEl.textContent = t("map.companyName");
        }

        const viewEl = ref.current?.querySelector(".map-view-box");
        if (viewEl) {
            viewEl.textContent = t("map.viewMap");
        }

    }, [i18n.language]);

    return (

        <div
            ref={ref}
            className="map-container"
        />

    );

}
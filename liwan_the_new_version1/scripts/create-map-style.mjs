import fs from "fs";
import https from "https";

const STYLE_URL =
    "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

https.get(STYLE_URL, (response) => {

    let data = "";

    response.on("data", (chunk) => {
        data += chunk;
    });

    response.on("end", () => {

        const style = JSON.parse(data);

        // =========================================
        // إزالة Glyphs الخاصة بـ Carto
        // حتى يستخدم MapLibre الخط المحلي
        // =========================================

        delete style.glyphs;

        // =========================================
        // تعديل جميع طبقات النص
        // =========================================

        style.layers.forEach((layer) => {

            if (
                layer.type === "symbol" &&
                layer.layout &&
                layer.layout["text-field"]
            ) {

                layer.layout["text-font"] = [
                    "Cairo",
                    "Arial Unicode MS",
                    "sans-serif"
                ];

                // لون النص
                if (!layer.paint) {
                    layer.paint = {};
                }

                layer.paint["text-color"] = "#D6D6D6";
            }

        });

        // =========================================
        // حفظ Style محلي
        // =========================================

        fs.mkdirSync("./src/styles", {
            recursive: true
        });

        fs.writeFileSync(
            "./src/styles/dark-matter-cairo.json",
            JSON.stringify(style, null, 2)
        );

        console.log(
            "✓ Created src/styles/dark-matter-cairo.json"
        );
    });

}).on("error", (error) => {

    console.error(
        "Failed to download Carto style:",
        error
    );

});
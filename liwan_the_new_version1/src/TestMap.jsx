import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function TestMap() {
    const ref = useRef(null);
    useEffect(() => {
        const map = new maplibregl.Map({
            container: ref.current,
            style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
            center: [39.1728, 21.5433],
            zoom: 12,
        });
        map.on("load", () => console.log("LOADED OK"));
        map.on("error", (e) => console.error("ERR", e));
        return () => map.remove();
    }, []);

    return <div ref={ref} style={{ width: 600, height: 400, background: "red" }} />;
}
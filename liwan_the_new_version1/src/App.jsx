import { useEffect } from "react";
import "./App.css";
import Footer from "./Section/footer/footer.jsx";


import {
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";

import NavBar from "./Section/NavBar/NavBar.jsx";

import ArobPage from "./Arob_page/ArobPage.jsx";
import LiwanPage from "./Liwan_page/LiwanPage.jsx";

function App() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const frame = requestAnimationFrame(() => {
            const sectionId = decodeURIComponent(hash.slice(1));
            document.getElementById(sectionId)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });

        return () => cancelAnimationFrame(frame);
    }, [pathname, hash, key]);

    const variant = pathname.startsWith("/liwan")
        ? "liwan"
        : "arob";

    return (
        <div className="App">
            <NavBar variant={variant} />

            <Routes>
                <Route path="/" element={<ArobPage />} />

                <Route
                    path="/liwan"
                    element={<LiwanPage />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>

            <Footer variant={variant} />

        </div>
    );
}

export default App;
//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "maplibre-gl/dist/maplibre-gl.css";  // ✅ هنا بس
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./i18n.js";
import "./mobile.css";

// ...

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <App />
    </BrowserRouter>
)

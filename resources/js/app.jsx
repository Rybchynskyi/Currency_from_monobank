import './bootstrap';

import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";

import App from './components/App'

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

if(document.getElementById('app')) {
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}

import "../css/app.css";
import "./bootstrap";
import "flowbite";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { ScrollToTop } from "./components/ui/ScrollToTop";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <span className="loader"></span>
                <App {...props} />
                <Toaster richColors />
                <ScrollToTop />
            </>
        );
    },
    progress: {
        color: "hsl(var(--primary))",
    },
});

import { useState, useEffect } from "react";
import { ArrowUpToLine } from "lucide-react";
import { Button } from "./button";

export const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
        });
    };

    return (
        <>
            {showTopBtn && (
                <Button
                    onClick={goToTop}
                    className="fixed bottom-16 right-4"
                    size="icon"
                >
                    <ArrowUpToLine className="h-4 w-4" />
                </Button>
            )}
        </>
    );
};
'use client';

import React, { useEffect } from 'react';

export function LanguageSwitcher() {
    // Determine the user's preferred language or default to English

    useEffect(() => {
        // Function to initialize the widget
        const initWidget = () => {
            // @ts-ignore
            if (window.google && window.google.translate && window.google.translate.TranslateElement) {
                // @ts-ignore
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,te,kn,ta,ml',
                    layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                }, 'google_translate_element');
            }
        }

        // 1. If script isn't there, add it
        if (!document.querySelector('script[src*="translate.google.com"]')) {
            // @ts-ignore
            window.googleTranslateElementInit = initWidget;

            const addScript = document.createElement("script");
            addScript.setAttribute(
                "src",
                "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            );
            document.body.appendChild(addScript);
        } else {
            // 2. If script is there, manually init (because we navigated/re-mounted)
            // Check if element is empty to avoid double-init
            const target = document.getElementById('google_translate_element');
            if (target && target.innerHTML === "") {
                initWidget();
            }
        }
    }, []);

    return (
        <div className="flex items-center">
            <div id="google_translate_element" className="google-translate-container" />
        </div>
    );
}

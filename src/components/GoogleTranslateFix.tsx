'use client';

import { useEffect } from 'react';

export const GoogleTranslateFix = () => {
    useEffect(() => {
        // Monkey-patch Node.removeChild to prevent crashes when Google Translate modifies the DOM
        const originalRemoveChild = Node.prototype.removeChild;
        Node.prototype.removeChild = function <T extends Node>(child: T): T {
            try {
                return originalRemoveChild.call(this, child) as T;
            } catch (error) {
                console.warn('Google Translate Fix: Ignored removeChild error', error);
                // If the node isn't found, we just return the child and ignore the error
                // to prevent React from crashing.
                return child;
            }
        };

        // Also patch insertBefore as both are common points of failure
        const originalInsertBefore = Node.prototype.insertBefore;
        Node.prototype.insertBefore = function <T extends Node>(
            newNode: T,
            referenceNode: Node | null
        ): T {
            try {
                return originalInsertBefore.call(this, newNode, referenceNode) as T;
            } catch (error) {
                console.warn('Google Translate Fix: Ignored insertBefore error', error);
                // If reference node is not found, typically we might want to append, 
                // but for now, ignoring might be safer or just letting it fail silently 
                // to keep the app running.
                // However, usually removeChild is the main crasher.
                return newNode;
            }
        };
    }, []);

    return null;
};

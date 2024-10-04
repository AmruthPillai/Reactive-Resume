import React, { useEffect } from "react";

interface ToastProps {
    toastState: {
        visible: boolean,
        message: string
    }
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toastState, onClose }) => {
    useEffect(() => {
        console.log("Effect shown")
        if (toastState.visible) {
            console.log("true")
            const timer = setTimeout(onClose, 3000); // Auto-hide after 3 seconds
            return () => clearTimeout(timer); // Clean up the timeout on component unmount
        }
    }, [toastState, onClose]);

    return (
        <div
            className={`z-10 fixed bottom-4 right-4 max-w-xs bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 transition-transform transform ${toastState.visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
        >
            <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span className="text-sm font-medium">{toastState.message}</span>
        </div>
    );
};

export default Toast;

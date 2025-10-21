import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// FIX: Added the 'cn' function that was missing.
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 KB';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // If the size is in bytes, convert it to KB for consistency as per the request.
    if (i === 0) {
        return `${(bytes / k).toFixed(2)} KB`;
    }

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const generateUUID = () => crypto.randomUUID();
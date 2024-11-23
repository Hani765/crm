import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { toast } from "sonner";

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo;
    }
}

window.Pusher = Pusher;

export const echoInstance = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    logToConsole: false,
});

const pusherConnection = echoInstance.connector.pusher.connection;


pusherConnection.bind("connected", () => {
    toast.success("✅ Connected successfully!");
});

pusherConnection.bind("disconnected", () => {
    toast.error("⚠️ Connection lost. Please check your network.");
});

pusherConnection.bind("connecting_in", (delay: any) => {
    toast.info(`⏳ Network is slow. Reconnecting in ${delay}ms...`);
});

pusherConnection.bind("unavailable", () => {
    toast.info(
        "🚫 Network unavailable or very poor. Attempting to reconnect..."
    );
});

pusherConnection.bind("error", (error: any) => {
    toast.error(
        "❌ A connection error occurred. Please verify your Pusher settings or network."
    );
});

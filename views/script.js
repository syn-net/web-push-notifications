/*
import { readFile } from 'fs/promises';

let DEFAULT_JSON_FILE_OPTS = {};
export async function readJSONFile(path, options = DEFAULT_JSON_FILE_OPTS) {
  const json = JSON.parse(
    await readFile(
      new URL(path, import.meta.url)
    )
  );
}
*/

const keys = {
  publicKey: `BMp-ty5lbtH7FHkUHk9yOZj6jwSpKQpxz83opGTFw0J7Q4Vyh5OsfjUPK3sQwfuGQfhR28YVCKj8IEcndZ1SYy8`,
  privateKey: `O312AfxTlQBaXVmup9oG9y0uL0Tr8vo-SX6oylnVu-w`,
};

var isDomReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

isDomReady(function(e) {
    const publicVapidKey = `${keys.publicKey}`;
    document.getElementById('subscribe').addEventListener('click', async function(e) {
        const registration = await navigator.serviceWorker.register('worker.js', {scope: '/'});
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json'
            }
        });
    });
    const urlBase64ToUint8Array = function(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
});

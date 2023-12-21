if ("serviceWorker" in navigator) {
    if (process.env.ELEVENTY_ENV !== 'production') {
        console.info('Skipping service worker');
    } else {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .catch(registrationError => {
                    console.error('SW registration failed : ', registrationError);
                })
        })
    }
}

window.addEventListener('beforeinstallprompt', e => e.preventDefault());

if ("serviceWorker" in navigator) {
    if (process && process.env && process.env.ELEVENTY_ENV === 'development') {
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

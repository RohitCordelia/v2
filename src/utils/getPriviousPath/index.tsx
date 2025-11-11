export function getPreviousPathname() {
    var isPageRefreshed = performance.navigation.type === 1;
    var previousURL = isPageRefreshed ? localStorage.getItem('previousURL') : document.referrer;

    if (previousURL) {
        try {
            var previousPathname = new URL(previousURL).pathname;
            return previousPathname;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    } else {
        localStorage.removeItem('store');
        localStorage.removeItem('promo_code');
        return null;
    }
}

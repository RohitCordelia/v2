import React, { useState, useEffect } from 'react';

export default function DownloadApp() {
    
    var applink = '';
    if (/iPhone/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent)) {
        applink = 'https://apps.apple.com/in/app/cordelia-cruises/id1589910857'
    } else {
        applink = 'https://play.google.com/store/apps/details?id=com.cordeliacruises.userapp'
    }
    
    useEffect(() => {
        window.location.href = applink;
    }, [applink]);
    return (
        <></>
    );
}

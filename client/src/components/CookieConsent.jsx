import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const CookieConsent = () => {
  const [accepted, setAccepted] = useState(!Cookie.get('cookieAccepted'));

  const handleAccept = () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);
    Cookie.set('cookieAccepted', true, { expires: expirationDate });
    setAccepted(true);
    console.log('Cookie accepted:', Cookie.get('cookieAccepted'));
  };
  
  const handleResetCookie = () => {
    Cookie.remove('cookieAccepted');
    setAccepted(false);
    console.log('Cookie reset:', Cookie.get('cookieAccepted'));
  };

  useEffect(() => {
    const cookieAccepted = Cookie.get('cookieAccepted');
    setAccepted(!cookieAccepted);
  }, []);

  return (
    <div className="cookie-consent">
      {accepted ? null : (
        <>
          <p>
            Ta strona używa plików cookie. Klikając "Akceptuj", zgadzasz się na używanie plików cookie.
          </p>
          <button onClick={handleAccept}>Akceptuj</button>
          <button onClick={handleResetCookie}>Resetuj cookie</button>
        </>
      )}

      <p style={{ marginTop: '10px', color: 'green' }}>
        {accepted ? 'Pliki cookie są zaakceptowane.' : 'Pliki cookie nie są zaakceptowane.'}
      </p>
    </div>
  );
};

export default CookieConsent;

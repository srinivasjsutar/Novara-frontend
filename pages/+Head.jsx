import { usePageContext } from 'vike-react/usePageContext'

export default function Head() {
  const { config } = usePageContext()
  const description = config?.metaDescription || ''

  return (
    <>
      {description && <meta name="description" content={description} />}
      {config?.keywords && <meta name="keywords" content={config.keywords} />}

      {/* Preload critical self-hosted fonts */}
      <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/fonts/urbanist-600.woff2" />
      <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/fonts/urbanist-700.woff2" />

      {/* Preload LCP hero image */}
      <link rel="preload" as="image" href="/images/homepage.webp" />

      {/* Preconnect to Google Fonts (used by Chatbot) — early connection, no blocking */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      <link rel="icon" href="/images/logo-icon.svg" />
      <link rel="apple-touch-icon" href="/images/logo-icon.svg" />
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow" />

      {/*
        GTM + Facebook Pixel — both deferred until after window load.
        This removes ~280 KiB of unused JS from the critical path.
        GTM loads once (was loading twice before — fixed).
      */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('load', function() {
            // GTM — load once
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WFF2PTMR');

            // Facebook Pixel — deferred
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          }, { once: true });
        `,
      }} />
    </>
  )
}
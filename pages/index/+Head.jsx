import { usePageContext } from 'vike-react/usePageContext'

export default function Head() {
  const { config } = usePageContext()
  const description = config?.metaDescription || ''

  return (
    <>
      {description && <meta name="description" content={description} />}
      {config?.keywords && <meta name="keywords" content={config.keywords} />}

      {/* Preload critical fonts */}
      <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/fonts/urbanist-600.woff2" />
      <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/fonts/urbanist-700.woff2" />

      {/* Preload hero image — LCP fix */}
      <link rel="preload" as="image" href="/images/homepage.webp" fetchPriority="high" />

      <link rel="icon" href="/images/logo-icon.svg" />
      <link rel="apple-touch-icon" href="/images/logo-icon.svg" />
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow" />

      {/* Preconnect for GTM */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* GTM — delayed until after page load to avoid render blocking */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('load', function() {
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WFF2PTMR');
          }, { once: true });
        `,
      }} />
    </>
  )
}
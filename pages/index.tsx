import React from 'react';
import Head from 'next/head'; // Added this line
import { ComingSoonPage } from "@/components/ComingSoon";

const ComingSoon: React.FC = () => {
  return (
    <>
      <Head>
        <title>Muscle Lab</title>
        <meta name="description" content="Muscle recovery & Wellness Lounge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo3.png" />
        {/* Open Graph / Facebook meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://musclelab.la" /> {/* replace with your website URL */}
        <meta property="og:title" content="Muscle Lab" />
        <meta property="og:description" content="Muscle recovery & Wellness Lounge" />
        <meta property="og:image" content="https://musclelab.la/searchbackgrounds/space4.png" /> {/* replace with the URL of the image you want to display */}
        {/* Twitter Card meta tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://musclelab.la" /> {/* replace with your website URL */}
        <meta property="twitter:title" content="Muscle Lab" />
        <meta property="twitter:description" content="Muscle recovery & Wellness Lounge" />
        <meta property="twitter:image" content="https://musclelab.la/searchbackgrounds/space4.png" /> {/* replace with the URL of the image you want to display */}
      </Head>
      <ComingSoonPage />
    </>
  )
}

export default ComingSoon;
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // Redirect old SITE 3 home route
        source: '/home', // Match old SITE 3 home route
        destination: '/', // Redirect to new SITE 4 home route
        permanent: true, // Mark as 301 permanent redirect to update SEO and bookmarks
      },
      {
        // Redirect old SITE 3 scorecard route, previously done with an Apache2 proxy for the C-CDA server
        source: '/scorecard',
        destination: '/c-cda/scorecard',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

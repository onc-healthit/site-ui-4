export async function fetchReleaseData() {
  const releaseVersionURL = process.env.NEXT_PUBLIC_RELEASE_VERSION_URL
  const releaseDateURL = process.env.NEXT_PUBLIC_RELEASE_DATE_URL

  if (!releaseVersionURL || !releaseDateURL) {
    throw new Error('Release URLs are not defined in the environment variables')
  }

  const responseVersion = await fetch(releaseVersionURL)
  const responseDate = await fetch(releaseDateURL)

  if (!responseVersion.ok || !responseDate.ok) {
    throw new Error('Failed to fetch release data')
  }

  const releaseVersionHTML = await responseVersion.text()
  const releaseDateHTML = await responseDate.text()

  return { releaseVersionHTML, releaseDateHTML }
}

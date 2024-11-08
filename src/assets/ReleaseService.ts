export async function fetchReleaseData() {
  const releaseVersionText: string = await fetchReleaseVersion()
  const releaseDateText: string = await fetchReleaseDate()
  return { releaseVersionText, releaseDateText }
}

export async function fetchReleaseVersion() {
  const releaseVersionURL = process.env.NEXT_PUBLIC_RELEASE_VERSION_URL
  if (!releaseVersionURL) {
    throw new Error('Release Version URL is not defined in the environment variables')
  }

  const responseVersion = await fetch(releaseVersionURL)
  if (!responseVersion.ok) {
    throw new Error('Failed to fetch release Version')
  }

  const releaseVersionText = await responseVersion.text()
  return releaseVersionText
}

export async function fetchReleaseDate() {
  const releaseDateURL = process.env.NEXT_PUBLIC_RELEASE_DATE_URL
  if (!releaseDateURL) {
    throw new Error('Release Date URL is not defined in the environment variables')
  }

  const responseDate = await fetch(releaseDateURL)
  if (!responseDate.ok) {
    throw new Error('Failed to fetch release date')
  }

  const releaseDateText = await responseDate.text()
  return releaseDateText
}

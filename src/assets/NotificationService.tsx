import { fetchSanitizedMarkdownData } from '@/services/markdownToHTMLService'

export interface Announcement {
  id: string
  title: string
  content: string
}

export const fetchNotifications = async (): Promise<Announcement[]> => {
  // Placeholder for actual fetch logic
  return [
    {
      id: '1',
      title: 'Scheduled Maintenance',
      content:
        'Our site will be undergoing scheduled maintenance on Friday, July 28th, from 2 AM to 4 AM (UTC). During this time, some services may be unavailable. We apologize for any inconvenience and appreciate your patience.',
    },
    {
      id: '2',
      title: 'Monthly Updates',
      content:
        'We regularly implement monthly updates to enhance your experience with our SITE tools. To stay informed about the latest features, improvements, and any important changes, we encourage you to review our release notes. You can find them in the bottom left corner of the navigation. Keeping up with these updates will help you maximize the benefits of our tools and ensure you’re using them to their full potential!',
    },
  ]
}

export const fetchMarkdownData = async () => {
  const releaseVersionURL = 'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/version.md'
  const releaseDateURL = 'https://raw.githubusercontent.com/onc-healthit/site-content/master/site-ui-4/release-date.md'

  const releaseVersionHTML = await fetchSanitizedMarkdownData(releaseVersionURL)
  const releaseDateHTML = await fetchSanitizedMarkdownData(releaseDateURL)

  return { releaseVersionHTML, releaseDateHTML }
}

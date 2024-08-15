export interface Announcement {
  id: string
  title: string
  content: string
}

export const fetchNotifications = async (): Promise<Announcement[]> => {
  // Placeholder for actual notifications
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

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
      title: 'Monthly Updates',
      content:
        'We regularly implement monthly updates to enhance your experience with our SITE tools. To stay informed about the latest features, improvements, and any important changes, we encourage you to review our release notes. You can find them in the bottom left corner of the navigation. Keeping up with these updates will help you maximize the benefits of our tools and ensure you’re using them to their full potential!',
    },
  ]
}

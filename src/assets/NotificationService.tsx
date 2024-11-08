export interface Announcement {
  id: string
  title: string
  content: string
  date: string
}

export const fetchNotifications = async (): Promise<Announcement[]> => {
  return [
    {
      id: '1',
      title: 'Monthly Updates',
      content:
        'We regularly implement monthly updates to enhance your experience with our SITE tools. To stay informed about the latest features, improvements, and any important changes, we encourage you to review our release notes. You can find them in the bottom left corner of the navigation. Keeping up with these updates will help you maximize the benefits of our tools and ensure you’re using them to their full potential!',
      date: '2024-11-13',
    },
    {
      id: '2',
      title: 'SITE UI 4 Released!',
      content:
        'The Standards Implementation & Testing Environment (SITE) have undergone comprehensive enhancements to improve security, usability, functionality, and performance, offering a more intuitive and efficient user experience.',
      date: '2024-11-13',
    },
  ]
}

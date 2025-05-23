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
      title: 'Improvements on functionality',
      content: `SITE has made several updates to improve the functionality of the Standards Implementation & Testing Environment (SITE). Please see below for details on the recent fixes that have been deployed to address reported issues:<br /><br />
      <ol>
        <li>SMTP MT Tests 39, 40, 41: A fix has been implemented to address issues with the “Check MDN for Delivery Notification” button.</li>
        <li>XDR Receive Tests: A fix has been deployed to resolve the root cause of a PKIX error that was affecting XDR receive test cases (3, 4a, 4b, 5, 8, and 9).</li>
        <li>XDR Test 1: A fix has been deployed to address an error with the XDR send test.</li>
      </ol>
      Before utilizing these services again, we recommend that all users review and verify they have downloaded the current certificates available on the website and install them on their systems. If you encounter any further issues, please report them to the Google Groups page.<br /><br />
      Please be advised that we are still working on resolving an ongoing issue with the Direct Certificate Discovery Tool (DCDT). Our team is actively working to resolve this issue as quickly as possible. While this issue may not impact all testers, we are committed to addressing it for those who are affected.<br /><br />
      We will provide an update as soon as it becomes available.<br /><br />
      Thank you for your patience and understanding.`,
      date: '2025-05-25',
    },
    {
      id: '2',
      title: 'Monthly Updates',
      content:
        'We regularly implement monthly updates to enhance your experience with our SITE tools. To stay informed about the latest features, improvements, and any important changes, we encourage you to review our release notes. You can find them in the bottom left corner of the navigation. Keeping up with these updates will help you maximize the benefits of our tools and ensure you’re using them to their full potential!',
      date: '2024-11-20',
    },
    {
      id: '3',
      title: 'SITE UI 4 Released!',
      content:
        'The Standards Implementation & Testing Environment (SITE) have undergone comprehensive enhancements to improve security, usability, functionality, and performance, offering a more intuitive and efficient user experience.',
      date: '2024-11-20',
    },
  ]
}

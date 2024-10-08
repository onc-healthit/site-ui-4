/*
eventType: Describes the type of action being tracked, Button Click Form Submission, Dropdown Selection,
Link Click, Sub Menu Anchor Link Click, etc.
eventCategory: Groups events together, such as by a specific tool name or navigation page
eventLabel: Provides specific details for the event such as what the action and outcome is after the event is fired
*/
const eventTrack = (eventType: string, eventCategory: string, eventLabel: string) => {
  if (typeof window.gtag === 'function') {
    if (process.env.NEXT_PUBLIC_IS_DEBUG_MODE === 'true') {
      console.info({
        event: eventType,
        eventCategory: eventCategory,
        eventLabel: eventLabel,
      })
    }
    if (process.env.NEXT_PUBLIC_IS_EVENT_TRACKING === 'true') {
      window.gtag('event', eventType, {
        event_category: eventCategory,
        event_label: eventLabel,
      })
    }
  }
}

export default eventTrack

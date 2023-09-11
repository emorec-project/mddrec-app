import React, { useState } from 'react';
import CalendarComponent from './CalendarComponent';

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface CalendarPageProps {
  events: Event[];
}

const CalendarPage: React.FC<CalendarPageProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      <CalendarComponent events={events} onEventClick={handleEventClick} />
      {selectedEvent && (
        <div>
          <h2>Selected Event:</h2>
          <p>{selectedEvent.title}</p>
          <p>{selectedEvent.start.toString()}</p>
          <p>{selectedEvent.end.toString()}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;

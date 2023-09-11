import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import he from 'date-fns/locale/he'; // Hebrew locale

const locales = {
  'en-US': enUS,
  'he-IL': he,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface CalendarComponentProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events, onEventClick }) => {
  const [selectedLocale, setSelectedLocale] = useState<'en-US' | 'he-IL'>('en-US');

  const handleSelectEvent = (event: Event) => {
    onEventClick(event);
  };

  const toggleLocale = () => {
    setSelectedLocale((prevLocale) => (prevLocale === 'en-US' ? 'he-IL' : 'en-US'));
  };

  return (
    <div>
      <button onClick={toggleLocale}>
        {selectedLocale === 'en-US' ? 'Switch to Hebrew' : 'Switch to English'}
      </button>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          culture={selectedLocale}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;

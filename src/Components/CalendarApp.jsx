import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal"
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop"
import "@schedule-x/theme-default/dist/index.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const theme = useSelector((state) => state.theme.mode);
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        title: "to do something",
        start: "2025-04-09 00:00",
        end: "2025-04-09 01:00",
        description:"for to do somethinggg"
      },
      {id: "2",
        title: "to do something",
        start: "2025-04-17 00:00",
        end: "2025-04-17 01:00",
        description:"for to do somethinggg"},
    ],
    plugins: [createEventModalPlugin(), createDragAndDropPlugin(), eventsService],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();

  }, [theme]);
 
  calendar?calendar.setTheme(theme):""

  return (
    <div>
<button className="border  mb-2">add element</button>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;

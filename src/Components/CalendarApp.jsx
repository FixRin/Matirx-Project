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

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

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
        start: "2025-04-10 00:00",
        end: "2025-04-10 01:00",
        description:"for to do somethinggg"},
    ],
    plugins: [createEventModalPlugin(), createDragAndDropPlugin(), eventsService],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  return (
    <div>

      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;

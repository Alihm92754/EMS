import { useEffect, useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { Link, usePage } from "@inertiajs/react";
import Navbar from "@/Layouts/Navbar";
import "@schedule-x/theme-default/dist/index.css";

const Calendar = () => {
  const { timesheets } = usePage().props;
  const [eventsService] = useState(() => createEventsServicePlugin());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let formattedEvents = [];
    if (timesheets && timesheets.length > 0) {
      formattedEvents = timesheets.map((timesheet) => ({
        id: timesheet.id.toString(),
        title: "Work Hours",
        start: timesheet.start_time.replace(" ", "T"),
        end: timesheet.end_time.replace(" ", "T"),
        url: `/timesheets/${timesheet.id}`,
      }));
    }
    setEvents(formattedEvents);
    eventsService.add(formattedEvents);
  }, [timesheets]);

  const calendarApp = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    plugins: [eventsService],
    defaultView: "week",
    timeZone: "UTC",
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-950 to-purple-600 bg-clip-text text-transparent">
              Timesheet Calendar
            </h1>
            <div className="flex gap-4 w-full sm:w-auto">
              <Link 
                href="/timesheets" 
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-purple-600 text-white hover:from-blue-900 hover:to-purple-500 transition-all duration-200 text-center"
              >
                Go Back
              </Link>
              <Link
                href="/timesheets/create"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 to-purple-600 text-white hover:from-blue-900 hover:to-purple-500 transition-all duration-200 text-center"
              >
                Add New Timesheet
              </Link>
            </div>
          </div>

          {/* Calendar Container */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <ScheduleXCalendar
              calendarApp={calendarApp}
              key={JSON.stringify(events)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Calendar.layout = (page) => <Navbar children={page} />;
export default Calendar;
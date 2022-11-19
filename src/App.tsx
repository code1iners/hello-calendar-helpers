import { useEffect, useState } from "react";
import { makeCalendar } from "@ce1pers/date-helpers";
import { clazz } from "@ce1pers/use-class";
import { CalendarDateItem } from "@ce1pers/date-helpers/src/calendar-helpers/types";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function App() {
  const [calendar, setCalendar] = useState<CalendarDateItem[]>([]);
  const [date, setDate] = useState<number>();
  const [month, setMonth] = useState<number>();

  useEffect(() => {
    const now = new Date();
    setCalendar(makeCalendar(now.getFullYear(), month));

    setDate(undefined);
  }, [month]);

  const onDateClick = (date: CalendarDateItem) => {
    setDate(date.date);
  };

  return (
    <main className="h-screen flex flex-col gap-5 justify-center items-center">
      <article className="flex items-center justify-center gap-1 tracking-wider text-lg">
        <span>{month ?? "?"}월</span>
        <span>{date ?? "?"}일</span>
      </article>

      <article>
        <ul className="grid grid-cols-6 gap-3">
          {months.map((month) => (
            <li
              key={month}
              className="text-center cursor-pointer"
              onClick={() => setMonth(month)}
            >
              {month}월
            </li>
          ))}
        </ul>
      </article>

      <article className="flex flex-col gap-5">
        <ul className="grid grid-cols-7 gap-5">
          {calendar.map((date) => (
            <li
              className={clazz(
                "cursor-pointer",
                date.month !== month ? "text-gray-500" : ""
              )}
              key={date.key}
              onClick={() => onDateClick(date)}
            >
              {date.date}
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}

export default App;

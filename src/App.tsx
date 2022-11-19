import { useEffect, useState } from "react";
import { makeCalendar, getPassedTime } from "@ce1pers/date-helpers";
import { clazz } from "@ce1pers/use-class";
import { CalendarDateItem } from "@ce1pers/date-helpers/src/calendar-helpers/types";
import { GetPassedTimeOutputs } from "@ce1pers/date-helpers/dist/src/shared/types";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let intervalId: number | undefined = undefined;

function App() {
  const [calendar, setCalendar] = useState<CalendarDateItem[]>([]);
  const [date, setDate] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [passed, setPassed] = useState<GetPassedTimeOutputs | null>();
  const now = new Date();

  useEffect(() => {
    setDate(now.getDate());
    setMonth(now.getMonth() + 1);

    intervalId = window.setInterval(() => {
      setPassed(getPassedTime(now));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const now = new Date();
    setCalendar(makeCalendar(now.getFullYear(), month));

    setDate((prev) => prev ?? undefined);
  }, [month]);

  const onDateClick = (date: CalendarDateItem) => {
    setDate(date.date);
    setMonth(date.month);
  };

  return (
    <main className="h-screen flex flex-col gap-10 justify-center items-center">
      <article className="flex flex-col items-center justify-center gap-10 tracking-wider">
        {passed ? (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>{passed.time}</span>
            <span>{passed.unit}</span>
            <span>passed..</span>
          </div>
        ) : null}

        <div className="flex items-center gap-3 text-2xl">
          <span>{month ?? "?"} 월</span>
          <span>{date ?? "?"} 일</span>
        </div>
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
                "cursor-pointer text-center",
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

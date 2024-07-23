import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './WorkoutCalendar.css';
import { WorkoutCount } from '../../../../common/types/data/workoutCount.type';
import { formatDateYYYYMMDD } from '../../../../utils/date/date';

interface WorkoutCalendarProps {
  onDateClick: (date: Date) => void;
  workoutCounts: WorkoutCount[];
}

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ onDateClick, workoutCounts }) => {
  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      console.log(workoutCounts[0].date.toString(), formatDateYYYYMMDD(date))
      const workoutCount = workoutCounts.find(
        count => count.date.toString() === formatDateYYYYMMDD(date)
      );
      if (workoutCount) {
        const count = workoutCount.count;
        return `workout-count-${count}`;
      }
    }
    return null;
  };

  const handleDateClick = (value: Date) => {
      onDateClick(value);
  };

  return <Calendar onClickDay={handleDateClick} tileClassName={getTileContent} className={"calendar"} />;
};

export default WorkoutCalendar;

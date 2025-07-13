import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './WorkoutCalendar.css';
import { formatDateYYYYMMDD } from '../../../../utils/date/date';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { fetchWorkoutsForPeriod } from '../../../../store/workouts/actions';
import { useTranslation } from 'react-i18next';

interface WorkoutCalendarProps {
  onDateClick: (date: Date) => void;
}

const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ onDateClick }) => {
  const { i18n } = useTranslation();
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const dispatch = useAppDispatch();
  const workouts = useAppSelector((state) => state.workouts.workouts);

  useEffect(() => {
    const reloadWorkouts = async () => {
      const startDate = new Date(
        activeStartDate.getFullYear(),
        activeStartDate.getMonth(),
        1,
      );
      startDate.setDate(startDate.getDate() - 7);
      if (startDate > new Date()) return;
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 42);
      await dispatch(
        fetchWorkoutsForPeriod({ start: startDate, end: endDate }),
      );
    };
    reloadWorkouts();
  }, [activeStartDate, dispatch]);

  const workoutCounts = workouts.reduce(
    (acc, workout) => {
      const dateStr = formatDateYYYYMMDD(workout.date);
      acc[dateStr] = (acc[dateStr] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = formatDateYYYYMMDD(date);
      const count = workoutCounts[dateStr];
      if (count) {
        return `workout-count-${count}`;
      }
    }
    return '';
  };

  const handleDateClick = (value: Date) => {
    onDateClick(value);
  };

  const handleActiveStartDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (activeStartDate) setActiveStartDate(activeStartDate);
  };

  const localeMapping: { [key: string]: string } = {
    'en-US': 'en',
    ua: 'ukr',
    he: 'he',
  };

  const currentLocale = localeMapping[i18n.language] || 'en';

  return (
    <Calendar
      onClickDay={handleDateClick}
      tileClassName={getTileClassName}
      className={'calendar'}
      onActiveStartDateChange={handleActiveStartDateChange}
      locale={currentLocale}
    />
  );
};

export default WorkoutCalendar;

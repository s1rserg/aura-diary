import React, { useState} from 'react';
import Calendar from 'react-calendar';
import WorkoutForm from './components/workoutForm/WorkoutForm';
import { WorkoutEntry } from '../../common/types/data/workoutEntry.type';
import 'react-calendar/dist/Calendar.css';
import './WorkoutCalendar.css'
import { useAppDispatch } from '../../hooks/hooks';
import { createWorkout } from '../../store/workouts/actions';

const WorkoutCalendar: React.FC = () => {
  const [, setDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleDateClick = (value: Date) => {
    setDate(value);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: WorkoutEntry) => {
    console.log(data)
    await dispatch(createWorkout(data));
    setIsModalOpen(false)
  };

  return (
    <div>
      <Calendar onClickDay={handleDateClick} className={"calendar"}/>
      {isModalOpen && (
        <WorkoutForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default WorkoutCalendar;
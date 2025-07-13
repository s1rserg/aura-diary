import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  deleteWorkout,
  updateWorkout,
  createWorkout,
} from '../../store/workouts/actions';
import { WorkoutEntry } from '../../common/types/types';
import { formatDate, reformatDate } from '../../utils/date/date';
import WorkoutCalendar from './components/workout-calendar/WorkoutCalendar';
import WorkoutItem from './components/workout-item/WorkoutItem';

const MainPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editWorkout, setEditWorkout] = useState<WorkoutEntry | null>(null);

  const dispatch = useAppDispatch();
  const workouts = useAppSelector((state) => state.workouts.workouts);

  const handleDateClick = async (date: Date) => {
    if (date < new Date()) {
      setSelectedDate(formatDate(date));
    } else {
      setSelectedDate(null);
    }
  };

  const handleCreateClick = () => {
    setEditWorkout(null);
    setIsModalOpen(true);
  };

  const handleEditClick = async (id: string) => {
    const workoutToEdit =
      workoutsForDate.find((workout) => workout.id === id) || null;
    setEditWorkout(workoutToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    await dispatch(deleteWorkout(id));
  };

  const handleSubmit = async (data: WorkoutEntry) => {
    if (editWorkout) {
      await dispatch(updateWorkout(data));
    } else {
      await dispatch(createWorkout(data));
    }
    setIsModalOpen(false);
  };

  const workoutsForDate = selectedDate
    ? workouts.filter(
        (workout) => formatDate(workout.date) === reformatDate(selectedDate),
      )
    : [];

  return (
    <div>
      <WorkoutCalendar onDateClick={handleDateClick} />
      {selectedDate && (
        <WorkoutItem
          selectedDate={selectedDate}
          workouts={workoutsForDate}
          isModalOpen={isModalOpen}
          editWorkout={editWorkout}
          handleCreateClick={handleCreateClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleSubmit={handleSubmit}
          setIsModalOpen={setIsModalOpen}
          setEditWorkout={setEditWorkout}
        />
      )}
    </div>
  );
};

export default MainPage;

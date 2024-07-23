import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchWorkoutsForDate,
  deleteWorkout,
  updateWorkout,
  createWorkout,
  fetchWorkoutsCounts,
} from "../../store/workouts/actions";
import WorkoutCalendar from "./components/workoutCalendar/WorkoutCalendar";
import { WorkoutEntry } from "../../common/types/types";
import WorkoutItem from "./components/workoutItem/WorkoutItem";
import { formatDate } from "../../utils/date/date";

const MainPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editWorkout, setEditWorkout] = useState<WorkoutEntry | null>(null);

  const dispatch = useAppDispatch();
  const workoutsForDate = useAppSelector(
    (state) => state.workouts.workoutsForDate
  );
  const workoutsCounts = useAppSelector(
    (state) => state.workouts.workoutsCounts
  );

  useEffect(() => {
    dispatch(fetchWorkoutsCounts());
  }, [dispatch]);

  const handleDateClick = async (date: Date) => {
    if (date < new Date()) {
      setSelectedDate(formatDate(date));
      await dispatch(fetchWorkoutsForDate(formatDate(date)));
    } else {
      setSelectedDate(null);
    }
  };

  const handleCreateClick = () => {
    setEditWorkout(null);
    setIsModalOpen(true);
  };

  const handleEditClick = async (id: string) => {
    const workoutToEdit = workoutsForDate.find(workout => workout.id === id) || null;
    setEditWorkout(workoutToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    await dispatch(deleteWorkout(id));
    if (selectedDate) await dispatch(fetchWorkoutsForDate(selectedDate));
    dispatch(fetchWorkoutsCounts());
  };

  const handleSubmit = async (data: WorkoutEntry) => {
    if (editWorkout) {
      await dispatch(updateWorkout(data));
    } else {
      await dispatch(createWorkout(data));
    }
    setIsModalOpen(false);
    if (selectedDate) await dispatch(fetchWorkoutsForDate(selectedDate));
    dispatch(fetchWorkoutsCounts());
  };

  return (
    <div>
      <WorkoutCalendar workoutCounts={workoutsCounts}  onDateClick={handleDateClick} />
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
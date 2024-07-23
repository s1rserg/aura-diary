import React from "react";
import { type WorkoutEntry as WorkoutEntryType } from "../../../../common/types/types";
import "./WorkoutItem.css";
import WorkoutForm from "../workoutForm/WorkoutForm";
import { formatDate } from "../../../../utils/date/date";

interface WorkoutItemProps {
  selectedDate: string;
  workouts: WorkoutEntryType[];
  isModalOpen: boolean;
  editWorkout: WorkoutEntryType | null;
  handleCreateClick: () => void;
  handleEditClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
  handleSubmit: (data: WorkoutEntryType) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditWorkout: (workout: WorkoutEntryType | null) => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({
  selectedDate,
  workouts,
  isModalOpen,
  editWorkout,
  handleCreateClick,
  handleEditClick,
  handleDeleteClick,
  handleSubmit,
  setIsModalOpen,
}) => {

  return (
    <div className="workout-entry-container">
      <button className="button create-entry-button" onClick={handleCreateClick}>
        Create New Workout Entry
      </button>
      {workouts.length > 0 ? (
        <ul className="workout-list">
          {workouts.map((workout) => (
            <li key={workout.id} className="workout-item">
              <div>
                <p>
                  <strong>Date:</strong> {formatDate(workout.date)}
                </p>
                <p>
                  <strong>Duration:</strong> {workout.duration} minutes
                </p>
                <p>
                  <strong>Rating:</strong> {workout.rating}
                </p>
                <p>
                  <strong>Trigger:</strong> {workout.trigger}
                </p>
                <p>
                  <strong>Energy Level Before:</strong> {workout.energyLevelBefore}
                </p>
                <p>
                  <strong>Energy Level After:</strong> {workout.energyLevelAfter}
                </p>
                <p>
                  <strong>Times:</strong> {workout.times}
                </p>
              </div>
              <div className="edit-entry-buttons">
                <button className="button edit-entry-button" onClick={() => handleEditClick(workout.id)}>Edit</button>
                <button className="button edit-entry-button" onClick={() => handleDeleteClick(workout.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts for this date.</p>
      )}
      {isModalOpen && (
        <WorkoutForm
          selectedDate={selectedDate}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialValues={editWorkout || undefined}
        />
      )}
    </div>
  );
};

export default WorkoutItem;

import React from 'react';
import { type WorkoutEntry as WorkoutEntryType } from '../../../../common/types/types';
import './WorkoutItem.css';
import WorkoutForm from '../workoutForm/WorkoutForm';
import { formatDate } from '../../../../utils/date/date';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className="workout-entry-container">
      <button
        className="button create-entry-button"
        onClick={handleCreateClick}
      >
        {t('create workout')}
      </button>
      {workouts.length > 0 ? (
        <ul className="workout-list">
          {workouts.map((workout) => (
            <li key={workout.id} className="workout-item">
              <div>
                <p>
                  <strong>{t('date')}:</strong> {formatDate(workout.date)}
                </p>
                <p>
                  <strong>{t('duration')}:</strong> {workout.duration}{' '}
                  {t('minutes')}
                </p>
                <p>
                  <strong>{t('rating')}:</strong> {workout.rating}
                </p>
                <p>
                  <strong>{t('trigger')}:</strong>{' '}
                  {t(workout.trigger as string)}
                </p>
                <p>
                  <strong>{t('mood level before')}:</strong>{' '}
                  {workout.energyLevelBefore}
                </p>
                <p>
                  <strong>{t('mood level after')}:</strong>{' '}
                  {workout.energyLevelAfter}
                </p>
                <p>
                  <strong>{t('times')}:</strong> {workout.times}
                </p>
              </div>
              <div className="edit-entry-buttons">
                <button
                  className="button edit-entry-button"
                  onClick={() => handleEditClick(workout.id)}
                >
                  {t('edit')}
                </button>
                <button
                  className="button edit-entry-button"
                  onClick={() => handleDeleteClick(workout.id)}
                >
                  {t('delete')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t('no workouts')}</p>
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

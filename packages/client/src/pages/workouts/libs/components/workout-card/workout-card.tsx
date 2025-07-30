import styles from './styles.module.css';
import { WorkoutDto } from '~/common/types/types';
import { WorkoutMenu } from '../workout-menu/workout-menu';

type Properties = {
  onDelete: (workout: WorkoutDto) => void;
  onEdit: (workout: WorkoutDto) => void;
  workout: WorkoutDto;
};

const WorkoutCard = ({
  onDelete,
  onEdit,
  workout,
}: Properties): JSX.Element => {
  const handleEditClick = () => {
    onEdit(workout);
  };

  const handleDeleteClick = () => {
    onDelete(workout);
  };

  return (
    <div className={styles['workout-container']}>
      <div className={styles['workout-link']}>
        <div className={styles['header']}>
          <span className={styles['workout-name']}>{workout.name}</span>
          <span className={styles['workout-date']}>
            {new Date(workout.date).toLocaleDateString()}
          </span>
        </div>

        <span className={styles['workout-date']}>{workout.notes}</span>

        <div className={styles['exercises']}>
          {workout.exercises.slice(0, 3).map((exercise) => (
            <div key={exercise.id} className={styles['exercise']}>
              <span className={styles['exercise-name']}>
                {exercise.exercise?.name || 'Unnamed Exercise'}
              </span>
              <span className={styles['sets']}>
                {exercise.sets.length} set
                {exercise.sets.length !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
          {workout.exercises.length > 3 && (
            <span className={styles['more']}>
              +{workout.exercises.length - 3} more
            </span>
          )}
        </div>
      </div>

      <WorkoutMenu onDelete={handleDeleteClick} onEdit={handleEditClick} />
    </div>
  );
};

export { WorkoutCard };

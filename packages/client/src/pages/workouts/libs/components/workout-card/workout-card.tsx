import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';
import { WorkoutDto } from '~/common/types/types';
import { configureString } from '~/helpers/helpers';
import { AppPath } from '~/common/enums/enums';
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
  const workoutRoute = configureString(AppPath.WORKOUT, {
    id: workout.id,
  });

  const handleEditClick = () => {
    onEdit(workout);
  };

  const handleDeleteClick = () => {
    onDelete(workout);
  };

  return (
    <div className={styles['workout-container']}>
      <NavLink className={styles['workout'] as string} to={workoutRoute} />
      <span className={styles['workout-name']}>{workout.name}</span>
      <WorkoutMenu onDelete={handleDeleteClick} onEdit={handleEditClick} />
    </div>
  );
};

export { WorkoutCard };

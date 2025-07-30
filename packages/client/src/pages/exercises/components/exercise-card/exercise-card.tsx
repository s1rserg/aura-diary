import { ExerciseDto, LevelType } from '~/common/types/types';
import styles from './styles.module.css';

const getImagePath = (exerciseName: string): string => {
  const transformed = exerciseName
    .replace(/[\/\s]+/g, '_')
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');
  return `/exercises/${transformed}/images/0.jpg`;
};

const getLevelClass = (level: LevelType): string => {
  switch (level) {
    case LevelType.Beginner:
      return styles.levelBeginner;
    case LevelType.Intermediate:
      return styles.levelIntermediate;
    case LevelType.Expert:
      return styles.levelExpert;
    default:
      return '';
  }
};

type Props = {
  exercise: ExerciseDto;
  narrow?: boolean;
};

const ExerciseCard = ({ exercise, narrow = false }: Props): JSX.Element => {
  const { name, primaryMuscles, force, level, mechanic, equipment, category } =
    exercise;

  const imageSrc = getImagePath(name);

  return (
    <div
      className={`${styles.card} ${narrow ? styles.narrow : ''}`}
      data-id={exercise.id}
    >
      <img className={styles.image} src={imageSrc} alt={name} loading="lazy" />

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>

        <div className={styles.row}>
          <span className={`${styles.level} ${getLevelClass(level)}`}>
            {level}
          </span>
          <span className={styles.label}>
            <strong>Force:</strong> {force ?? '—'}
          </span>
          <span className={styles.label}>
            <strong>Mechanic:</strong> {mechanic ?? '—'}
          </span>
          <span className={styles.label}>
            <strong>Equipment:</strong> {equipment ?? '—'}
          </span>
          <span className={styles.label}>
            <strong>Category:</strong> {category}
          </span>
        </div>

        <div className={styles.muscles}>
          <strong>Muscles:</strong>{' '}
          {primaryMuscles.length > 0 ? primaryMuscles.join(', ') : '—'}
        </div>
      </div>
    </div>
  );
};

export { ExerciseCard };

import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { actions as exerciseActions } from '~/store/exercises/exercises';
import { LevelType } from '~/common/types/types';
import styles from './styles.module.css';
import { Loader } from '~/components/loader/loader';
import { DataStatus } from '../../common/enums/enums';

const getImagePaths = (name: string): string[] => {
  const base = name
    .replace(/[\/\s]+/g, '_')
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('_');
  return [`/exercises/${base}/images/0.jpg`, `/exercises/${base}/images/1.jpg`];
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

const Exercise = (): JSX.Element => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const dispatch = useAppDispatch();

  const { exercise, exerciseStatus: status } = useAppSelector(
    (state) => state.exercises,
  );

  useEffect(() => {
    if (exerciseId) {
      dispatch(exerciseActions.getById(exerciseId));
    }
  }, [dispatch, exerciseId]);

  if (status === DataStatus.PENDING) return <Loader />;
  if (!exercise) return <p>Exercise not found.</p>;

  const {
    id,
    name,
    primaryMuscles,
    force,
    level,
    mechanic,
    equipment,
    category,
    instructions,
  } = exercise;

  const [img1, img2] = getImagePaths(name);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{name}</h1>

      <div className={styles.images}>
        <img src={img1} alt={`${name} view 1`} className={styles.image} />
        <img src={img2} alt={`${name} view 2`} className={styles.image} />
      </div>

      <div className={styles.info}>
        <span className={`${styles.level} ${getLevelClass(level)}`}>
          {level}
        </span>
        <div className={styles.detail}>
          <strong>Force:</strong> {force ?? '—'}
        </div>
        <div className={styles.detail}>
          <strong>Mechanic:</strong> {mechanic ?? '—'}
        </div>
        <div className={styles.detail}>
          <strong>Equipment:</strong> {equipment ?? '—'}
        </div>
        <div className={styles.detail}>
          <strong>Category:</strong> {category}
        </div>
        <div className={styles.detail}>
          <strong>Primary Muscles:</strong>{' '}
          {primaryMuscles.length > 0 ? primaryMuscles.join(', ') : '—'}
        </div>
      </div>

      {instructions && instructions?.length > 0 && (
        <div className={styles.instructions}>
          <h2>Instructions</h2>
          <ol>
            {instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <div className={styles.actions}>
        <Link
          to={`/workouts/create?exerciseId=${id}`}
          className={styles.createButton}
        >
          Create Workout with This Exercise
        </Link>
      </div>
    </div>
  );
};

export { Exercise };

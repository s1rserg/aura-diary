import React, { useState, useEffect } from 'react';
import {
  WorkoutEntry,
  Trigger,
} from '../../../../common/types/data/workout-entry.type';
import { formatDateForBackend } from '../../../../utils/date/date';
import './WorkoutForm.css';
import { useTranslation } from 'react-i18next';
import Input from '../../../../components/input/Input';
import Select from '../../../../components/select/Select';
import Button from '../../../../components/button/Button';

interface WorkoutFormProps {
  selectedDate: string;
  onClose: () => void;
  onSubmit: (data: WorkoutEntry) => void;
  initialValues?: WorkoutEntry;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({
  selectedDate,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const { t } = useTranslation();

  const [duration, setDuration] = useState<number>(
    initialValues?.duration ?? 10,
  );
  const [rating, setRating] = useState<number>(initialValues?.rating ?? 5);
  const [trigger, setTrigger] = useState<Trigger>(
    initialValues?.trigger ?? 'other',
  );
  const [energyLevelBefore, setEnergyLevelBefore] = useState<number>(
    initialValues?.energyLevelBefore ?? 5,
  );
  const [energyLevelAfter, setEnergyLevelAfter] = useState<number>(
    initialValues?.energyLevelAfter ?? 5,
  );
  const [sets, setSets] = useState<number>(initialValues?.sets ?? 1);
  const [times, setTimes] = useState<number>(initialValues?.times ?? 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: WorkoutEntry = {
      id: initialValues?.id || crypto.randomUUID(),
      date: new Date(formatDateForBackend(selectedDate)),
      duration,
      rating,
      trigger,
      energyLevelBefore,
      energyLevelAfter,
      sets,
      times,
    };
    onSubmit(newEntry);
    onClose();
  };

  useEffect(() => {
    if (initialValues) {
      setDuration(initialValues.duration);
      setRating(initialValues.rating);
      setTrigger(initialValues?.trigger ?? 'other');
      setEnergyLevelBefore(initialValues?.energyLevelBefore ?? 5);
      setEnergyLevelAfter(initialValues?.energyLevelAfter ?? 5);
      setTimes(initialValues.times);
    }
  }, [initialValues]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <Input
            label={`${t('duration')} (${t('minutes')}):`}
            name="duration"
            required={true}
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min={'1'}
            max={'100'}
          />
          <Input
            label={`${t('rating')} (1-10):`}
            name="rating"
            required={true}
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min={'1'}
            max={'10'}
          />
          <Select
            label={`${t('trigger')}:`}
            name="trigger"
            onChange={(e) => setTrigger(e.target.value as Trigger)}
            options={[
              { value: 'photo', label: t('photo') },
              { value: 'conversation', label: t('conversation') },
              { value: 'movie', label: t('movie') },
              { value: 'reading', label: t('reading') },
              { value: 'boredom', label: t('boredom') },
              { value: 'schedule😎', label: t('schedule') },
              { value: 'idk', label: t('idk') },
              { value: 'other', label: t('other') },
            ]}
            defaultValue={trigger}
          />
          <Input
            label={`${t('mood level before')} (1-10):`}
            name="energyBefore"
            required={true}
            type="number"
            value={energyLevelBefore}
            onChange={(e) => setEnergyLevelBefore(Number(e.target.value))}
            min={'1'}
            max={'10'}
          />
          <Input
            label={`${t('mood level after')} (1-10):`}
            name="energyAfter"
            required={true}
            type="number"
            value={energyLevelAfter}
            onChange={(e) => setEnergyLevelAfter(Number(e.target.value))}
            min={'1'}
            max={'10'}
          />
          <Input
            label={`${t('how many sets')}:`}
            name="sets"
            required={true}
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            min={'1'}
            max={'100'}
          />
          <Input
            label={`${t('how many times')}:`}
            name="times"
            required={true}
            type="number"
            value={times}
            onChange={(e) => setTimes(Number(e.target.value))}
            min={'1'}
            max={'100'}
          />
          <Button className="button " type="submit">
            {t('save')}
          </Button>
          <Button className="button button-2" type="button" onClick={onClose}>
            {t('cancel')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;

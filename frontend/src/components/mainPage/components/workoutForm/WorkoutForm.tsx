import React, { useState, useEffect } from "react";
import {
  WorkoutEntry,
  Trigger,
} from "../../../../common/types/data/workoutEntry.type";
import Input from "../../../input/Input";
import Select from "../../../select/Select";
import Button from "../../../button/Button";
import { formatDateForBackend } from "../../../../utils/date/date";
import "./WorkoutForm.css"

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
  const [duration, setDuration] = useState<number>(initialValues?.duration ?? 10);
  const [rating, setRating] = useState<number>(initialValues?.rating ?? 5);
  const [trigger, setTrigger] = useState<Trigger>(initialValues?.trigger ?? "other");
  const [energyLevelBefore, setEnergyLevelBefore] = useState<number>(initialValues?.energyLevelBefore ?? 5);
  const [energyLevelAfter, setEnergyLevelAfter] = useState<number>(initialValues?.energyLevelAfter ?? 5);
  const [times, setTimes] = useState<number>(initialValues?.times ?? 1);

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
      times,
    };
    onSubmit(newEntry);
    onClose();
  };

  useEffect(() => {
    if (initialValues) {
      setDuration(initialValues.duration);
      setRating(initialValues.rating);
      setTrigger(initialValues?.trigger ?? "other");
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
            label="Duration (minutes):"
            name="duration"
            required={true}
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min={"1"}
            max={"100"}
          />
          <Input
            label="Rating (1-10):"
            name="rating"
            required={true}
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min={"1"}
            max={"10"}
          />
          <Select
            label="Trigger:"
            name="trigger"
            onChange={(e) => setTrigger(e.target.value as Trigger)}
            options={[
              { value: "photo", label: "photo" },
              { value: "conversation", label: "conversation" },
              { value: "movie", label: "movie" },
              { value: "reading", label: "reading" },
              { value: "boredom", label: "boredom" },
              { value: "schedule😎", label: "schedule😎" },
              { value: "other", label: "other" },
            ]}
            defaultValue={trigger}
          />
          <Input
            label="Mood Level Before (1-10):"
            name="energyBefore"
            required={true}
            type="number"
            value={energyLevelBefore}
            onChange={(e) => setEnergyLevelBefore(Number(e.target.value))}
            min={"1"}
            max={"10"}
          />
          <Input
            label="Mood Level After (1-10):"
            name="energyAfter"
            required={true}
            type="number"
            value={energyLevelAfter}
            onChange={(e) => setEnergyLevelAfter(Number(e.target.value))}
            min={"1"}
            max={"10"}
          />
          <Input
            label="How many times:"
            name="times"
            required={true}
            type="number"
            value={times}
            onChange={(e) => setTimes(Number(e.target.value))}
            min={"1"}
            max={"10"}
          />
          <Button className="button " type="submit">Save</Button>
          <Button className="button button-2" type="button" onClick={onClose}>Cancel</Button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;

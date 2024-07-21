import React, { useState } from "react";
import {
  WorkoutEntry,
  Trigger,
  Location,
} from "../../../../common/types/data/workoutEntry.type";
import Input from "../../../input/Input";
import Select from "../../../select/Select";
import Button from "../../../button/Button";

interface WorkoutFormProps {
  onClose: () => void;
  onSubmit: (data: WorkoutEntry) => void;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onClose, onSubmit }) => {
  const [duration, setDuration] = useState<number>(10);
  const [rating, setRating] = useState<number>(1);
  const [location, setLocation] = useState<Location>("home");
  const [trigger, setTrigger] = useState<Trigger>("other");
  const [energyLevelBefore, setEnergyLevelBefore] = useState<number>(1);
  const [energyLevelAfter, setEnergyLevelAfter] = useState<number>(1);
  const [times, setTimes] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: WorkoutEntry = {
      id: crypto.randomUUID(),
      date: new Date(),
      duration,
      rating,
      location,
      trigger,
      energyLevelBefore,
      energyLevelAfter,
      times,
    };
    onSubmit(newEntry);
    onClose();
  };

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
            label="Location:"
            name="location"
            onChange={(e) => setLocation(e.target.value as Location)}
            options={[
                {value: "home", label: "home"},
                {value: "under Oleksandr's window", label: "under Oleksandr's window"},
                {value: "other", label: "other"}
              ]}
          />
          <Select
            label="Trigger:"
            name="trigger"
            onChange={(e) => setTrigger(e.target.value as Trigger)}
            options={[
                {value: "photo", label: "photo"},
                {value: "conversation", label: "conversation"},
                {value: "movie", label: "movie"},
                {value: "reading", label: "reading"},
                {value: "boredom", label: "boredom"},
                {value: 'schedule😎', label: 'schedule😎'},
                {value: "other", label: "other"}
              ]}
          />
          <Input
            label="Energy Level Before (1-10):"
            name="energyBefore"
            required={true}
            type="number"
            value={energyLevelBefore}
            onChange={(e) => setEnergyLevelBefore(Number(e.target.value))}
            min={"1"}
            max={"10"}
          />
          <Input
            label="Energy Level After (1-10):"
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
            value={energyLevelAfter}
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

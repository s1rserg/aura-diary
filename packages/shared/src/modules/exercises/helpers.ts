import { CategoryType, EquipmentType, ForceType, MechanicType } from './enums';
import { ExerciseDto, SetField } from './types';

export const getApplicableFields = (exercise: ExerciseDto): SetField[] => {
  const { category, equipment, force, mechanic } = exercise;
  const fields: SetField[] = [];

  if (force === ForceType.Static) {
    fields.push('duration');
    return fields;
  }

  if (category === CategoryType.Cardio) {
    fields.push('duration', 'distance');
  }

  if (
    [
      CategoryType.Strength,
      CategoryType.Powerlifting,
      CategoryType.OlympicWeightlifting,
      CategoryType.Strongman,
    ].includes(category)
  ) {
    fields.push('reps');

    if (
      [
        EquipmentType.Barbell,
        EquipmentType.Dumbbell,
        EquipmentType.Machine,
        EquipmentType.Cable,
        EquipmentType.EZCurlBar,
        EquipmentType.Kettlebells,
        EquipmentType.MedicineBall,
        EquipmentType.Bands,
      ].includes(equipment!)
    ) {
      fields.push('weight');
    }
  }

  if (equipment === EquipmentType.BodyOnly || equipment === null) {
    if (!fields.includes('reps')) fields.push('reps');
    if (
      category === CategoryType.Stretching ||
      category === CategoryType.Plyometrics ||
      mechanic === MechanicType.Isolation
    ) {
      fields.push('duration');
    }
  }

  if (category === CategoryType.Stretching) {
    if (!fields.includes('duration')) fields.push('duration');
    const index = fields.indexOf('reps');
    if (index !== -1) fields.splice(index, 1);
  }

  if (category === CategoryType.Plyometrics) {
    if (!fields.includes('reps')) fields.push('reps');
    if (!fields.includes('duration')) fields.push('duration');
  }

  return Array.from(new Set(fields));
};

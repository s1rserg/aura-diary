import {
  Muscle,
  ForceType,
  LevelType,
  EquipmentType,
  MechanicType,
  CategoryType,
} from '../../../../common/types/types';
import { Search, Select } from '../../../../components/components';
import styles from './styles.module.css';
import { Control } from 'react-hook-form';

type FilterProps = {
  control: Control<
    {
      search: string;
      primaryMuscles: string[];
      force: string[];
      level: string[];
      mechanic: string[];
      equipment: string[];
      category: string[];
    },
    null
  >;
  errors: any;
};

const Filters = ({ control, errors }: FilterProps): JSX.Element => (
  <div className={styles['filters-container']}>
    <Search
      control={control}
      isLabelHidden={false}
      errors={errors}
      label="Exercise search"
      name="search"
      onChange={() => {}}
      placeholder="Enter exercise name"
    />
    <Select
      control={control}
      errors={errors}
      label="Primary Muscles"
      name="primaryMuscles"
      options={Object.values(Muscle).map((muscle) => ({
        label: muscle,
        value: muscle,
      }))}
      isMulti
      isSearchable
      placeholder="Select muscles"
    />
    <Select
      control={control}
      errors={errors}
      label="Force"
      name="force"
      options={Object.values(ForceType).map((force) => ({
        label: force,
        value: force,
      }))}
      isMulti
      placeholder="Select force"
    />
    <Select
      control={control}
      errors={errors}
      label="Level"
      name="level"
      options={Object.values(LevelType).map((level) => ({
        label: level,
        value: level,
      }))}
      isMulti
      placeholder="Select level"
    />
    <Select
      control={control}
      errors={errors}
      label="Equipment"
      name="equipment"
      options={Object.values(EquipmentType).map((item) => ({
        label: item,
        value: item,
      }))}
      isMulti
      placeholder="Select equipment"
    />
    <Select
      control={control}
      errors={errors}
      label="Mechanic"
      name="mechanic"
      options={Object.values(MechanicType).map((item) => ({
        label: item,
        value: item,
      }))}
      isMulti
      placeholder="Select mechanic"
    />
    <Select
      control={control}
      errors={errors}
      label="Category"
      name="category"
      options={Object.values(CategoryType).map((item) => ({
        label: item,
        value: item,
      }))}
      isMulti
      placeholder="Select category"
    />
  </div>
);

export { Filters };

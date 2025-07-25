// import {
//   WorkoutResponseDto,
//   WorkoutUpdateRequestDto,
//   WorkoutUpdateRequestSchema,
// } from '~/common/types/types';
// import styles from './styles.module.css';
// import { useAppDispatch, useAppForm, useAppSelector } from '~/hooks/hooks';
// import { useWatch } from 'react-hook-form';
// import { useEffect, useMemo } from 'react';
// import {
//   Button,
//   CountryCityInput,
//   ImageInput,
//   Input,
//   Loader,
//   Select,
// } from '~/components/components';
// import { actions as attributeActions } from '~/store/attributes/attributes.js';
// import { locationOptions } from '../workout-create-form/libs/constants/constants';
// import { DataStatus } from '~/common/enums/enums';
// import { getOptions } from '../workout-create-form/libs/helpers/helpers';

// type Properties = {
//   onSubmit: (payload: WorkoutUpdateRequestDto) => void;
//   workout: WorkoutResponseDto;
// };

// const WorkoutUpdateForm = ({ onSubmit, workout }: Properties): JSX.Element => {
//   const dispatch = useAppDispatch();

//   const { control, errors, handleSubmit } = useAppForm<WorkoutUpdateRequestDto>(
//     {
//       defaultValues: workout,
//       validationSchema: WorkoutUpdateRequestSchema,
//     },
//   );

//   const {
//     categoriesStatus,
//     subcategoriesStatus,
//     filtersStatus,
//     categories,
//     subcategories,
//     filters,
//   } = useAppSelector(({ attributes }) => attributes);

//   useEffect(() => {
//     void dispatch(attributeActions.getAllCategories());
//     void dispatch(attributeActions.getAllSubcategories());
//     void dispatch(attributeActions.getAllFilters());
//   }, [dispatch]);

//   const descriptionValue = useWatch({
//     control,
//     defaultValue: workout.description,
//     name: 'description',
//   });

//   const locationValue = useWatch({
//     control,
//     defaultValue: workout.location,
//     name: 'location',
//   });

//   const isDescriptionCounterShown = !errors['description']?.message;
//   const isCountryCityInputShown = locationValue === locationOptions[0].value;

//   const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
//     void handleSubmit((formData: WorkoutUpdateRequestDto) => {
//       onSubmit(formData);
//     })(event_);
//   };

//   const categoryOptions = useMemo(() => getOptions(categories), [categories]);

//   const subcategoryOptions = useMemo(
//     () => getOptions(subcategories),
//     [subcategories],
//   );

//   const filterOptions = useMemo(() => getOptions(filters), [filters]);

//   const isLoading =
//     categoriesStatus === DataStatus.IDLE ||
//     categoriesStatus === DataStatus.PENDING ||
//     subcategoriesStatus === DataStatus.IDLE ||
//     subcategoriesStatus === DataStatus.PENDING ||
//     filtersStatus === DataStatus.IDLE ||
//     filtersStatus === DataStatus.PENDING;

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
//       <Input
//         autoComplete="name"
//         control={control}
//         errors={errors}
//         label="Name"
//         name="name"
//       />
//       <div className={styles['description-wrapper']}>
//         <Input
//           control={control}
//           errors={errors}
//           label="Description"
//           name="description"
//           rowsCount={4}
//         />
//         {isDescriptionCounterShown && (
//           <span className={styles['description-counter']}>
//             {descriptionValue?.length}/{500}
//           </span>
//         )}
//       </div>
//       <div className={styles['attributes-wrapper']}>
//         <Select
//           control={control}
//           errors={errors}
//           label="Category"
//           name="category"
//           options={categoryOptions}
//           placeholder="Choose category"
//         />
//         <Select
//           control={control}
//           errors={errors}
//           label="Subcategory"
//           name="subcategory"
//           options={subcategoryOptions}
//           placeholder="Choose subcategory"
//         />
//         <Select
//           control={control}
//           errors={errors}
//           label="Filters"
//           name="filters"
//           options={filterOptions}
//           placeholder="Choose filters"
//           isMulti
//         />
//       </div>
//       <div className={styles['images-wrapper']}>
//         <ImageInput
//           placeholder="Choose images"
//           name="images"
//           label="Upload Images"
//           control={control}
//           errors={errors}
//         />
//       </div>
//       <div className={styles['location-wrapper']}>
//         <Select
//           control={control}
//           errors={errors}
//           label="Location"
//           name="location"
//           options={locationOptions}
//           placeholder="Choose location"
//         />
//         {isCountryCityInputShown && (
//           <CountryCityInput
//             control={control}
//             cityName="city"
//             countryName="country"
//             cityLabel="City"
//             countryLabel="Country"
//             errors={errors}
//           />
//         )}
//       </div>
//       <Input
//         control={control}
//         errors={errors}
//         label="Price per session, USD"
//         name="pricePerSession"
//         type="number"
//       />
//       <Input
//         control={control}
//         errors={errors}
//         label="Length of session, min"
//         name="lengthOfSession"
//         type="number"
//       />
//       <div className={styles['button-wrapper']}>
//         <Button label="Update" type="submit" />
//       </div>
//     </form>
//   );
// };

// export { WorkoutUpdateForm };

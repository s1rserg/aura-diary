import {
  ListingCreateRequestDto,
  ListingCreateRequestSchema,
} from '~/common/types/types.js';
import {
  DEFAULT_LISTING_CREATE_PAYLOAD,
  locationOptions,
} from './libs/constants/constants.js';
import { useAppDispatch, useAppForm, useAppSelector } from '~/hooks/hooks.js';
import { useWatch } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import {
  Button,
  CountryCityInput,
  ImageInput,
  Input,
  Loader,
  Select,
} from '~/components/components.js';
import styles from './styles.module.css';
import { getOptions } from './libs/helpers/helpers.js';
import { actions as attributeActions } from '~/store/attributes/attributes.js';
import { DataStatus } from '~/common/enums/enums.js';

type Properties = {
  onSubmit: (payload: ListingCreateRequestDto) => void;
};

const ListingCreateForm = ({ onSubmit }: Properties): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    categoriesStatus,
    subcategoriesStatus,
    filtersStatus,
    categories,
    subcategories,
    filters,
  } = useAppSelector(({ attributes }) => attributes);

  useEffect(() => {
    void dispatch(attributeActions.getAllCategories());
    void dispatch(attributeActions.getAllSubcategories());
    void dispatch(attributeActions.getAllFilters());
  }, [dispatch]);

  const { control, errors, handleSubmit } = useAppForm<ListingCreateRequestDto>(
    {
      defaultValues: DEFAULT_LISTING_CREATE_PAYLOAD,
      validationSchema: ListingCreateRequestSchema,
    }
  );

  const descriptionValue = useWatch({
    control,
    defaultValue: '',
    name: 'description',
  });

  const locationValue = useWatch({
    control,
    defaultValue: '',
    name: 'location',
  });

  const isDescriptionCounterShown = !errors['description']?.message;
  const isCountryCityInputShown = locationValue === locationOptions[0].value;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit(async (formData: ListingCreateRequestDto) => {
      onSubmit(formData);
    })(event_);
  };

  const categoryOptions = useMemo(() => getOptions(categories), [categories]);

  const subcategoryOptions = useMemo(
    () => getOptions(subcategories),
    [subcategories]
  );

  const filterOptions = useMemo(() => getOptions(filters), [filters]);

  const isLoading =
    categoriesStatus === DataStatus.IDLE ||
    categoriesStatus === DataStatus.PENDING ||
    subcategoriesStatus === DataStatus.IDLE ||
    subcategoriesStatus === DataStatus.PENDING ||
    filtersStatus === DataStatus.IDLE ||
    filtersStatus === DataStatus.PENDING;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input
        autoComplete="given-name"
        control={control}
        errors={errors}
        label="Name"
        name="name"
      />
      <div className={styles['description-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Description"
          name="description"
          rowsCount={4}
        />
        {isDescriptionCounterShown && (
          <span className={styles['description-counter']}>
            {descriptionValue.length}/{500}
          </span>
        )}
      </div>
      <div className={styles['attributes-wrapper']}>
        <Select
          control={control}
          errors={errors}
          label="Category"
          name="category"
          options={categoryOptions}
          placeholder="Choose category"
        />
        <Select
          control={control}
          errors={errors}
          label="Subcategory"
          name="subcategory"
          options={subcategoryOptions}
          placeholder="Choose subcategory"
        />
        <Select
          control={control}
          errors={errors}
          label="Filters"
          name="filters"
          options={filterOptions}
          placeholder="Choose filters"
          isMulti
        />
      </div>
      <div className={styles['images-wrapper']}>
        <ImageInput
          placeholder="Choose images"
          name="images"
          label="Upload Images"
          control={control}
          errors={errors}
        />
      </div>
      <div className={styles['location-wrapper']}>
        <Select
          control={control}
          errors={errors}
          label="Location"
          name="location"
          options={locationOptions}
          placeholder="Choose location"
        />
        {isCountryCityInputShown && (
          <CountryCityInput
            control={control}
            cityName="city"
            countryName="country"
            cityLabel="City"
            countryLabel="Country"
            errors={errors}
          />
        )}
      </div>
      <Input
        control={control}
        errors={errors}
        label="Price per session, USD"
        name="pricePerSession"
        type="number"
      />
      <Input
        control={control}
        errors={errors}
        label="Length of session, min"
        name="lengthOfSession"
        type="number"
      />
      <div className={styles['button-wrapper']}>
        <Button label="Create" type="submit" />
      </div>
    </form>
  );
};

export { ListingCreateForm };

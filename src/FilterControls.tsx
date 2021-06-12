import * as React from "react";
import {
  Dropdown,
  IDropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import { ChoiceGroup, IChoiceGroupOption, Stack } from "@fluentui/react";
import { categoryMapping, getEnumValues } from "./Utils";
import {
  Ambulance,
  Bed,
  BloodGroup,
  Food,
  Medicince,
  Oxygen,
  Therapy,
  Vaccine,
} from "./Enums";
import { LocationPicker } from "./LocationPicker";

export interface IFilterControlsProps {
  type: string;
  category: string;
  subCategory: string[];
  city: string[];
  setType: (k: string) => void;
  setCategory: (k: string) => void;
  setSubCategory: (k: string[]) => void;
  setCity: (k: string[]) => void;
}

export const FilterControls: React.FunctionComponent<IFilterControlsProps> = (
  props
) => {
  const { type, category, subCategory, setCategory, setSubCategory, setType } =
    props;
  const dropdownRef = React.createRef<IDropdown>();
  const onSetFocus = () => dropdownRef.current!.focus(true);

  const [dropdownOptions, setDropdownOptions] = React.useState<
    { key: string; text: string }[]
  >(getOptionsForCategory(category));

  const onCategoryChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ) => {
    const currentKey = option?.key || "all";
    setDropdownOptions(getOptionsForCategory(currentKey));

    setSubCategory([]);
    setCategory(currentKey);

    if (currentKey !== "all") {
      onSetFocus();
    }
  };

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    index?: number
  ): void => {
    if (item) {
      setSubCategory(
        item.selected
          ? [...subCategory, item.key as string]
          : subCategory.filter((key) => key !== item.key)
      );
    }
  };

  const onTypeChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    option?: IChoiceGroupOption | undefined
  ): void => {
    const currentKey = option?.key || "both";
    setType(currentKey);
  };

  const selectAllIfNoneSelected = () => {
    if (subCategory.length === 0 && category !== "all") {
      setSubCategory(dropdownOptions.map((k) => k.key));
    }
  };

  return (
    <Stack tokens={{ childrenGap: 5 }}>
      <ChoiceGroup
        selectedKey={type}
        options={typeOptions}
        onChange={onTypeChange}
        label="Show me"
      />

      <ChoiceGroup
        label="Pick one category"
        defaultSelectedKey={category}
        options={categoryOptions}
        onChange={onCategoryChange}
      />

      <Dropdown
        placeholder="Select options"
        label="Select Resource you are looking for"
        selectedKeys={subCategory}
        componentRef={dropdownRef}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
        multiSelect
        required={category !== "all"}
        disabled={category === "all"}
        options={dropdownOptions}
        styles={dropdownStyles}
        onDismiss={selectAllIfNoneSelected}
      />
      <LocationPicker
        onChange={(tags) => props.setCity(tags?.map((t) => t.name) || [])}
        selected={props.city}
      />
    </Stack>
  );
};

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const categoryOptions: IChoiceGroupOption[] = [
  {
    key: "all",
    text: "All",
    iconProps: {
      iconName: "CheckList",
      style: { color: "gray" },
    },
  },
  {
    key: "medicine",
    text: categoryMapping.medicine.text,
    iconProps: {
      iconName: categoryMapping.medicine.logoIcon,
      style: { color: categoryMapping.medicine.color },
    },
  },
  {
    key: "bloodgroup",
    text: categoryMapping.bloodgroup.text,
    iconProps: {
      iconName: categoryMapping.bloodgroup.logoIcon,
      style: { color: categoryMapping.bloodgroup.color },
    },
  },
  {
    key: "therapy",
    text: categoryMapping.therapy.text,
    iconProps: {
      iconName: categoryMapping.therapy.logoIcon,
      style: { color: categoryMapping.therapy.color },
    },
  },
  {
    key: "vaccine",
    text: categoryMapping.vaccine.text,
    iconProps: {
      iconName: categoryMapping.vaccine.logoIcon,
      style: { color: categoryMapping.vaccine.color },
    },
  },
  {
    key: "oxygen",
    text: categoryMapping.oxygen.text,
    iconProps: {
      iconName: categoryMapping.oxygen.logoIcon,
      style: { color: categoryMapping.oxygen.color },
    },
  },
  {
    key: "bed",
    text: categoryMapping.bed.text,
    iconProps: {
      iconName: categoryMapping.bed.logoIcon,
      style: { color: categoryMapping.bed.color },
    },
  },
  {
    key: "ambulance",
    text: categoryMapping.ambulance.text,
    iconProps: {
      iconName: categoryMapping.ambulance.logoIcon,
      style: { color: categoryMapping.ambulance.color },
    },
  },
  {
    key: "food",
    text: categoryMapping.food.text,
    iconProps: {
      iconName: categoryMapping.food.logoIcon,
      style: { color: categoryMapping.food.color },
    },
  },
];

const typeOptions: IChoiceGroupOption[] = [
  { key: "both", text: "Both" },
  { key: "availability", text: "Availability" },
  { key: "requirement", text: "Requirement" },
];

function getOptionsForCategory(category: string) {
  if (category === "medicine") {
    return getEnumValues(Medicince);
  } else if (category === "therapy") {
    return getEnumValues(Therapy);
  } else if (category === "oxygen") {
    return getEnumValues(Oxygen);
  } else if (category === "bed") {
    return getEnumValues(Bed);
  } else if (category === "bloodgroup") {
    return getEnumValues(BloodGroup);
  } else if (category === "ambulance") {
    return getEnumValues(Ambulance);
  } else if (category === "food") {
    return getEnumValues(Food);
  } else if (category === "vaccine") {
    return getEnumValues(Vaccine);
  } else {
    return [];
  }
}

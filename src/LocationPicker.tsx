import * as React from "react";

import {
  TagPicker,
  ITag,
  IBasePickerSuggestionsProps,
} from "@fluentui/react/lib/Pickers";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { useId } from "@fluentui/react-hooks";
import { toTitleCase } from "./Utils";
import data from "./resource-mapping";


const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested Cities",
  noResultsFoundText: "No city found",
};

const getTags: (tags: string[]) => ITag[] = (tags) => {
  return tags.map(toTitleCase).map((item) => ({
    key: item,
    name: item,
  }));
};

const testTags: ITag[] = getTags(data.cities);

const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
  if (!tagList || !tagList.length || tagList.length === 0) {
    return false;
  }
  return tagList.some((compareTag) => compareTag.key === tag.key);
};

const filterSuggestedTags = (filterText: string, tagList?: ITag[]): ITag[] => {
  return filterText
    ? testTags?.filter(
        (tag) =>
          tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 &&
          !listContainsTagList(tag, tagList)
      )
    : [];
};

const getTextFromItem = (item: ITag) => item.name;

export const LocationPicker: React.FunctionComponent<{
  onChange: (tags: ITag[] | undefined) => void;
  selected: string[];
}> = (props) => {
  const pickerId = useId("inline-picker");

  return (
    <div style={{marginTop: 10}}>
      <label style={{fontWeight:600}} htmlFor={pickerId}>Select cities (optional)</label>
      <TagPicker
        removeButtonAriaLabel="Remove"
        selectionAriaLabel="Selected cities"
        onResolveSuggestions={filterSuggestedTags}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        inputProps={{
          id: pickerId,
        }}
        onChange={props.onChange}
        selectedItems={getTags(props.selected)}
      />
    </div>
  );
};

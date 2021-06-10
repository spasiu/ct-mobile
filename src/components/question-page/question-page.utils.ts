import { append, without, includes } from 'ramda';

import { SelectionButtonTypes } from '../';

export const isButtonSelected = (
  selectedValue: string,
  canSelectMultiple: boolean,
  alternatives: string | string[],
): boolean => {
  return canSelectMultiple
    ? includes(selectedValue, alternatives)
    : selectedValue === alternatives;
};

export const getButtonType = (selected: boolean): SelectionButtonTypes =>
  selected ? SelectionButtonTypes.selected : SelectionButtonTypes.default;

export const handleSelectedValues = (
  selectedValue: string,
  alreadySelected: boolean,
  canSelectMultiple: boolean,
  alternatives: string | string[],
): string | string[] => {
  if (canSelectMultiple) {
    return alreadySelected
      ? without([selectedValue], alternatives as string[])
      : append(selectedValue, alternatives as string[]);
  }

  return alreadySelected ? '' : selectedValue;
};

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  rootKey: string;
  titleKey: string;
  subtitleKey: string;
  allowMultipleSelection: boolean;
  options: QuestionOption[];
}

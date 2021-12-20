export const img1 = require('../../assets/instruction-one.png');
export const img2 = require('../../assets/instruction-two.png');
export const img3 = require('../../assets/instruction-three.png');
export const img4 = require('../../assets/instruction-four.png');

export const instructions = [
  {
    image: img1,
    titleKey: 'onboarding.firstInstructionTitle',
    subtitleKey: 'onboarding.firstInstructionSubtitle',
  },
  {
    image: img2,
    titleKey: 'onboarding.secondInstructionTitle',
    subtitleKey: 'onboarding.secondInstructionSubtitle',
  },
  {
    image: img3,
    titleKey: 'onboarding.thridInstructionTitle',
    subtitleKey: 'onboarding.thridInstructionSubtitle',
  },
  {
    image: img4,
    titleKey: 'onboarding.fourthInstructionTitle',
    subtitleKey: 'onboarding.fourthInstructionSubtitle',
  },
] as const;

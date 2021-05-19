import { ContainerTypes } from './container.props';

export const isFixed = (type: keyof typeof ContainerTypes) => {
  return type === ContainerTypes.fixed;
};

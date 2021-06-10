import { ContainerTypes } from './container.props';

export const isFixed = (type: keyof typeof ContainerTypes): boolean => {
  return type === ContainerTypes.fixed;
};

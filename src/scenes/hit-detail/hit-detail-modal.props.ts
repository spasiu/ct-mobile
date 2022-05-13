import { Dispatch, SetStateAction } from 'react';

export interface HitDetailModalProps {
  isVisible?: boolean;
  onPressClose?: () => void;
  player?: string;
  description?: string;
  image_front?: string;
  image_back?: string;
  user?: string;
  breaker?: string;
}

export type useHitDetailModalHookType = {
  showBack: boolean;
  setShowBack: Dispatch<SetStateAction<boolean>>;
  zoom: boolean;
  setZoom: Dispatch<SetStateAction<boolean>>;
};

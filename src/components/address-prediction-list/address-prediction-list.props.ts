import { PredictionType } from '../../services/places-api';
import { ADDRESS_FORM_FIELDS } from '../../common/address/address-form';

export interface AddressPredictionListProps {
  addressPredictions?: PredictionType[];
  onItemPressed?: (prediction: {
    [ADDRESS_FORM_FIELDS.FIRST_LINE]: string;
    [ADDRESS_FORM_FIELDS.CITY]: string;
    [ADDRESS_FORM_FIELDS.STATE_PROVINCE_REGION]: string;
  }) => void;
}

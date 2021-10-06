import axios from 'axios';
import Config from 'react-native-config';
import { pathOr } from 'ramda';

const GOOGLE_PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export type PredictionType = {
  description: string;
  place_id: string;
  reference: string;
  types: string[];
};

export const getPredictions = async (
  term: string,
  country: string,
): Promise<PredictionType[]> => {
  if (term.trim() === '') {
    return [];
  }

  try {
    const encodedTerm = encodeURIComponent(term);
    const result = await axios.get(
      `${GOOGLE_PLACES_API_BASE_URL}/autocomplete/json?key=${Config.GOOGLE_PLACES_API_KEY}&types=address&input=${encodedTerm}&components=country:${country}`,
    );
    return pathOr([], ['data', 'predictions'], result);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getPostalCode = async (place_id: string) => {
  try {
    const result = await axios.get(
      `${GOOGLE_PLACES_API_BASE_URL}/details/json?key=${Config.GOOGLE_PLACES_API_KEY}&place_id=${place_id}`,
    );
    const postalCode = result.data.result.address_components.filter(
      (item: { types: string | string[] }) =>
        item.types.includes('postal_code'),
    )[0].long_name;

    return postalCode;
  } catch (e) {
    console.log(e);
    return '';
  }
};

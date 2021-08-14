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
    const result = await axios.post(
      `${GOOGLE_PLACES_API_BASE_URL}/autocomplete/json?key=${Config.GOOGLE_PLACES_API_KEY}&types=address&input=${encodedTerm}&components=country:${country}`,
    );
    return pathOr([], ['data', 'predictions'], result);
  } catch (e) {
    console.log(e);
    return [];
  }
};

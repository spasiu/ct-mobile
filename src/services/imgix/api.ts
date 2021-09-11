import { isEmpty } from 'ramda';
import Config from 'react-native-config';

export const getImgixUrl = (src = ''): string =>
  `${Config.IMAGE_SERVICE_URL}${src}`;

export const getImgixUrlWithQueryParams = (
  src = '',
  queryParams: { [key: string]: string | number },
): string => {
  let root = isEmpty(queryParams) ? getImgixUrl(src) : `${getImgixUrl(src)}?`;
  for (const key of Object.keys(queryParams)) {
    root += `&${key}=${queryParams[key]}`;
  }

  return root;
};

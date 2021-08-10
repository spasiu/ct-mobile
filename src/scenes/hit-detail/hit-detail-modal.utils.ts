import Config from 'react-native-config';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import { showMessage } from 'react-native-flash-message';

import { t } from '../../i18n/i18n';

export const shareHit = (
  title: string,
  filePath: string,
  dimensions: { width: number; height: number },
): void => {
  const imageExtension = 'png';
  const fileUrl = `${Config.IMAGE_SERVICE_URL}${filePath}?auto=compress&fm=${imageExtension}&w=${dimensions.width}&h=${dimensions.height}&fit=fill`;
  RNFetchBlob.config({
    fileCache: true,
    appendExt: imageExtension,
  })
    .fetch('GET', fileUrl)
    .then(async res => {
      const status = res.info().status;
      if (status === 200) {
        const base64 = await res.base64();
        const base64Data = `data:${imageExtension};base64,` + base64;

        Share.open({
          title,
          url: base64Data,
          type: `image/${imageExtension}`,
          failOnCancel: false,
        })
          .then(() => {
            res.flush();
          })
          .catch(() => {
            showMessage({
              message: t('errors.generic'),
              type: 'danger',
            });
          });
      }
    });
};

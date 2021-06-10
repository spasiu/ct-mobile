import React from 'react';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  QuestionPage,
  NavigationBar,
} from '../../components';
import { t } from '../../i18n/i18n';

export const EditBreakPreferencesScreen = ({ navigation, route }) => {
  const { content, userSelection, pageTitle } = route.params;
  return (
    <Container
      style={[s.flx_i, s.jcfe, s.mh0]}
      backgroundColor={s.bg_white}
      safeAreaEdges={['top', 'right', 'left']}
      containerType={ContainerTypes.fixed}>
      <NavigationBar
        onBackPressed={() => navigation.goBack()}
        title={pageTitle}
      />
      <QuestionPage
        initialSelection={userSelection}
        containerStyle={[s.mt2]}
        key={content.titleKey}
        rootKey={content.rootKey}
        titleKey={content.titleKey}
        subtitleKey={content.subtitleKey}
        options={content.options}
        actionButtonText={t('buttons.save')}
        allowMultipleSelection={content.allowMultipleSelection}
        onActionPressed={() => {}}
        showTitleBar={false}
      />
    </Container>
  );
};

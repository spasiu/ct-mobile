import React from 'react';
import { styles as s } from 'react-native-style-tachyons';
import {
  Container,
  ContainerTypes,
  QuestionPage,
  NavigationBar,
} from '../../components';
import { t } from '../../i18n/i18n';
import { postgresStringArray } from '../../utils/array';
import { useEditBreakPreferencesScreenHook } from './edit-break-preferences-screen.logic';
import { EditBreakPreferencesScreenProps } from './edit-break-preferences-screen.props';

export const EditBreakPreferencesScreen = ({
  navigation,
  route,
}: EditBreakPreferencesScreenProps): JSX.Element => {
  const { content, userSelection, pageTitle } = route.params;
  const { userId, updateUserPreferences, loading } =
    useEditBreakPreferencesScreenHook(navigation);
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
        {...content}
        initialSelection={userSelection}
        containerStyle={[s.mt2]}
        key={content.titleKey}
        actionButtonText={t('buttons.save')}
        allowMultipleSelection={content.allowMultipleSelection}
        onActionPressed={options =>
          updateUserPreferences({
            variables: {
              userId: userId,
              input: {
                [content.questionKey]: content.allowMultipleSelection
                  ? postgresStringArray(options as string[])
                  : options,
              },
            },
          })
        }
        showTitleBar={false}
        isLoading={loading}
      />
    </Container>
  );
};

import React, { useContext } from 'react';
import { showMessage } from 'react-native-flash-message';
import { styles as s } from 'react-native-style-tachyons';

import {
  Container,
  ContainerTypes,
  QuestionPage,
  NavigationBar,
} from '../../components';
import { t } from '../../i18n/i18n';
import { AuthContext, AuthContextType } from '../../providers/auth';
import {
  UserPreferencesDocument,
  useUpdateUserPreferencesMutation,
} from '../../services/api/requests';
import { postgresStringArray } from '../../utils/array';

import { EditBreakPreferencesScreenProps } from './edit-break-preferences-screen.props';

export const EditBreakPreferencesScreen = ({
  navigation,
  route,
}: EditBreakPreferencesScreenProps): JSX.Element => {
  const { content, userSelection, pageTitle } = route.params;
  const { user: authUser } = useContext(AuthContext) as AuthContextType;

  const [updateUserPreferences, { loading }] = useUpdateUserPreferencesMutation(
    {
      onError: () =>
        showMessage({
          message: t('errors.generic'),
          type: 'danger',
        }),
      refetchQueries: [
        {
          query: UserPreferencesDocument,
          variables: {
            id: authUser?.uid,
          },
        },
      ],
      awaitRefetchQueries: true,
    },
  );
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
              userId: authUser?.uid,
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

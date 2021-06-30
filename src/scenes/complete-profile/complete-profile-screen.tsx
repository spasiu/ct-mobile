import React, { useState, useContext, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { styles as s } from 'react-native-style-tachyons';
import { Formik } from 'formik';

import {
  Container,
  ContainerTypes,
  ActionFooter,
  FormInput,
  TitleBar,
  AvatarUpload,
} from '../../components';
import { t } from '../../i18n/i18n';
import { ROUTES_IDS } from '../../navigators/routes/identifiers';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useUpdateUserMutation } from '../../services/api/requests';
import { getFieldStatus } from '../../utils/form-field';

import { CompleteProfileScreenProps } from './complete-profile-screen.props';
import {
  COMPLETE_PROFILE_FORM_FIELDS,
  COMPLETE_PROFILE_SCHEMA,
} from './complete-profile-screen.presets';
import {
  getSuggestedName,
  getSuggestedUserPhotoURL,
  showError,
} from './complete-profile-screen.utils';

export const CompleteProfileScreen = ({
  navigation,
}: CompleteProfileScreenProps): JSX.Element => {
  const { user, uploadPhoto } = useContext(AuthContext) as AuthContextType;

  const [activeField, setActiveField] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const [updateUserMutation, { loading }] = useUpdateUserMutation({
    onError: () => showError(),
    onCompleted: () =>
      navigation.navigate(ROUTES_IDS.ONBOARDING_INSTRUCTIONS_SCREEN),
  });

  const firstNameField = useRef<TextInput>(null);
  const lastNameField = useRef<TextInput>(null);
  return (
    <Container
      style={[s.flx_i, s.jcfe]}
      backgroundColor={s.bg_white}
      containerType={ContainerTypes.scroll}>
      <Formik
        validateOnBlur
        validationSchema={COMPLETE_PROFILE_SCHEMA}
        initialValues={{
          [COMPLETE_PROFILE_FORM_FIELDS.USERNAME]: '',
          ...getSuggestedName(user),
          ...getSuggestedUserPhotoURL(user),
        }}
        onSubmit={values =>
          updateUserMutation({
            variables: {
              userId: 'jmrSPHmVoCOx7vBdDdNIr1ulE6u2',
              userInput: values,
            },
          })
        }>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={[s.flx_i, s.jcfs, s.aic, s.mb4]}>
              <TitleBar
                title={t('account.completeProfileTitle')}
                subtitle={t('account.completeProfileSubtitle')}
                wrapperStyle={[s.w_100]}
              />
              <AvatarUpload
                isLoading={uploadingPhoto}
                image={values[COMPLETE_PROFILE_FORM_FIELDS.USER_PHOTO]}
                containerStyle={[s.mv4]}
                onNewImageSelected={async response => {
                  setUploadingPhoto(true);
                  const url = await uploadPhoto(response);
                  handleChange(COMPLETE_PROFILE_FORM_FIELDS.USER_PHOTO)(url);
                  setUploadingPhoto(false);
                }}
              />
              <View style={[s.flx_i, s.w_100, s.jcfs]}>
                <FormInput
                  label={t('forms.usernameLabel')}
                  onChangeText={text =>
                    handleChange(COMPLETE_PROFILE_FORM_FIELDS.USERNAME)(
                      text.toLowerCase(),
                    )
                  }
                  value={values[COMPLETE_PROFILE_FORM_FIELDS.USERNAME]}
                  onFocus={() =>
                    setActiveField(COMPLETE_PROFILE_FORM_FIELDS.USERNAME)
                  }
                  status={getFieldStatus(
                    COMPLETE_PROFILE_FORM_FIELDS.USERNAME,
                    activeField,
                    errors,
                    touched,
                  )}
                  onBlur={event => {
                    handleBlur(COMPLETE_PROFILE_FORM_FIELDS.USERNAME)(event);
                    setActiveField('');
                  }}
                  errorMessage={errors[COMPLETE_PROFILE_FORM_FIELDS.USERNAME]}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    if (firstNameField.current) {
                      firstNameField.current.focus();
                    }
                  }}
                />
                <FormInput
                  ref={firstNameField}
                  label={t('forms.firstNameLabel')}
                  onChangeText={handleChange(
                    COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME,
                  )}
                  value={values[COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME]}
                  onFocus={() =>
                    setActiveField(COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME)
                  }
                  status={getFieldStatus(
                    COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME,
                    activeField,
                    errors,
                    touched,
                  )}
                  onBlur={event => {
                    handleBlur(COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME)(event);
                    setActiveField('');
                  }}
                  errorMessage={errors[COMPLETE_PROFILE_FORM_FIELDS.FIRST_NAME]}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    if (lastNameField.current) {
                      lastNameField.current.focus();
                    }
                  }}
                />
                <FormInput
                  ref={lastNameField}
                  label={t('forms.lastNameLabel')}
                  onChangeText={handleChange(
                    COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME,
                  )}
                  value={values[COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME]}
                  onFocus={() =>
                    setActiveField(COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME)
                  }
                  status={getFieldStatus(
                    COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME,
                    activeField,
                    errors,
                    touched,
                  )}
                  onBlur={event => {
                    handleBlur(COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME)(event);
                    setActiveField('');
                  }}
                  errorMessage={errors[COMPLETE_PROFILE_FORM_FIELDS.LAST_NAME]}
                  returnKeyType="go"
                  onSubmitEditing={handleSubmit}
                />
              </View>
            </View>
            <ActionFooter
              isLoading={loading}
              buttonText={t('buttons.createAccount')}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </Container>
  );
};

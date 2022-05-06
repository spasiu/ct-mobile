import { useContext, useState, useEffect } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NetworkStatus } from '@apollo/client';
import { userSelector } from '../../common/user-profile';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import {
  useLoggedUserQuery,
  useUpdateUserMutation,
} from '../../services/api/requests';
import { FilterContext, FilterContextType } from '../../providers/filter';
import { isEmpty } from 'ramda';
import {
  NotificationContext,
  NotificationContextType,
} from '../../providers/notification';
import { userProfileScreenHookType } from './user-profile-screen.props';

export const useUserProfileScreenHook = (): userProfileScreenHookType => {
  const {
    logout,
    uploadPhoto,
    user: authUser,
  } = useContext(AuthContext) as AuthContextType;
  const { cards, getCards, getDefaultPaymentCard, cleanPaymentInfo } =
    useContext(PaymentContext) as PaymentContextType;
  const { cleanFilters } = useContext(FilterContext) as FilterContextType;

  const { cleanNotificationData } = useContext(
    NotificationContext,
  ) as NotificationContextType;

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (isEmpty(cards)) {
      getCards(authUser as FirebaseAuthTypes.User);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading, refetch, networkStatus } = useLoggedUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const [updateUserMutation] = useUpdateUserMutation({
    onError: () => setUploadingPhoto(false),
    onCompleted: () => {
      refetch();
      setUploadingPhoto(false);
    },
  });

  const isRefetching = networkStatus === NetworkStatus.refetch;
  const user = userSelector(data);
  return {
    logout,
    uploadPhoto,
    userId: authUser?.uid,
    cards,
    getCards,
    getDefaultPaymentCard,
    cleanPaymentInfo,
    cleanFilters,
    cleanNotificationData,
    uploadingPhoto,
    setUploadingPhoto,
    confirmDelete,
    setConfirmDelete,
    data,
    loading,
    refetch,
    networkStatus,
    updateUserMutation,
    isRefetching,
    user,
  };
};

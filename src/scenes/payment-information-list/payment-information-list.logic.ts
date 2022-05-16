import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { PaymentContext, PaymentContextType } from '../../providers/payment';
import { isEmpty, find, propEq } from 'ramda';
import { useContext, useState, useEffect } from 'react';
import { usePaymentInformationListHookType } from './payment-information-list-screen.props';

export const usePaymentInformationListHook =
  (): usePaymentInformationListHookType => {
    const {
      cards,
      getCards,
      deleteCard,
      defaultPaymentMethod,
      saveDefaultPaymentMethod,
    } = useContext(PaymentContext) as PaymentContextType;
    const { user } = useContext(AuthContext) as AuthContextType;
    const [status, setStatus] = useState('idle');
    const [selectedCard, setSelectedCard] = useState('');
    const [cardToDelete, setCardToDelete] = useState('');

    useEffect(() => {
      if (isEmpty(cards)) {
        setStatus('loading');
        getCards(user as FirebaseAuthTypes.User);
        setStatus('idle');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // when a user deletes a card, we can't be sure if what is on selectedCard is correct
    // because user might have deleted the previous default card
    useEffect(() => {
      if (selectedCard) {
        const selectedCardExists = find(propEq('id', selectedCard))(cards);

        if (!selectedCardExists) setSelectedCard('');
      }
    }, [selectedCard, cards]);

    const handleSelectCard = async (cardInfoId: string) => {
      if (cardInfoId === selectedCard) return;
      setSelectedCard(cardInfoId);
      setStatus(cardInfoId === defaultPaymentMethod ? 'idle' : 'modified');
    };

    const handleDeleteCard = () => {
      setCardToDelete('');
      setStatus('loading');
      deleteCard(user as FirebaseAuthTypes.User, cardToDelete).then(() => {
        setStatus('idle');
      });
    };

    return {
      status,
      setStatus,
      cards,
      selectedCard,
      defaultPaymentMethod,
      saveDefaultPaymentMethod,
      handleSelectCard,
      cardToDelete,
      handleDeleteCard,
      setCardToDelete,
      user,
    };
  };

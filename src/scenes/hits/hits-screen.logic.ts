import { hitsSelector } from '../../common/hit';
import { userSelector } from '../../common/user-profile';
import { AuthContext, AuthContextType } from '../../providers/auth';
import { useContext, useState } from 'react';
import {
  String_Comparison_Exp,
  useHitsScreenQuery,
  useUserMinimalInformationQuery,
} from '../../services/api/requests';
import { isSearchTermValid } from '../../utils/search';
import { useHitsScreenHookType } from './hits-screen.props';

export const getHitsSearchAndFilterParams = (
  userId: string,
  searchTerm: string,
  userHitsFilterActive: boolean,
): { userHitsFilter: String_Comparison_Exp; searchInput: string } => {
  return {
    userHitsFilter: userHitsFilterActive ? { _eq: userId } : {},
    searchInput: isSearchTermValid(searchTerm) ? `%${searchTerm}%` : '%%',
  };
};

export const useHitsScreenHook = (PAGE_SIZE: number): useHitsScreenHookType => {
  const { user: authUser } = useContext(AuthContext) as AuthContextType;
  const [userHitsFilterActive, setUserHitsFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset, setOffset] = useState(PAGE_SIZE);
  const { data: users } = useUserMinimalInformationQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: authUser?.uid,
    },
  });

  const {
    data: requestData,
    loading,
    fetchMore,
  } = useHitsScreenQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      ...getHitsSearchAndFilterParams(
        authUser?.uid as string,
        searchTerm,
        userHitsFilterActive,
      ),
      offset: 0,
      limit: PAGE_SIZE,
    },
  });
  const hits = hitsSelector(requestData);
  const user = userSelector(users);
  const loadMore = () => {
    if (offset - PAGE_SIZE > hits.length) return;
    fetchMore({
      variables: { offset },
    });
    setOffset(offset + PAGE_SIZE);
  };

  return {
    userHitsFilterActive,
    setUserHitsFilterActive,
    user,
    searchTerm,
    setSearchTerm,
    setOffset,
    hits,
    loadMore,
    loading,
  };
};

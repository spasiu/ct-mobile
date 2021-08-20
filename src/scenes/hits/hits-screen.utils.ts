import { String_Comparison_Exp } from '../../services/api/requests';
import { isSearchTermValid } from '../../utils/search';

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

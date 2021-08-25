import { pathOr } from 'ramda';
import { ChatMessage, ChatUser } from './chat';

export const chatMessageUserSelector = (
  message: ChatMessage,
): Partial<ChatUser> => pathOr({}, ['user'], message);

export const chatMessageUsernameSelector = (message: ChatMessage): string => {
  const user = chatMessageUserSelector(message);
  return pathOr('', ['username'], user);
};

export const chatMessageUserImageSelector = (message: ChatMessage): string => {
  const user = chatMessageUserSelector(message);
  return pathOr('', ['image'], user);
};

export const chatMessageTextSelector = (message: ChatMessage): string =>
  pathOr('', ['text'], message);

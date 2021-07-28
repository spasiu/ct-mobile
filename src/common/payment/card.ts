export type CardExpiry = {
  month: number;
  year: number;
};

export type CardInput = {
  singleUseToken: string;
  profileId: string;
  merchantRefNum: string;
};

export enum CardTypes {
  VI = 'VI',
  AM = 'AM',
  MC = 'MC',
}

export type Card = {
  id: string;
  lastDigits: string;
  cardExpiry: CardExpiry;
  holderName: string;
  billingAddressId: string;
  cardType: keyof typeof CardTypes;
  paymentToken: string;
};

export type AuthLogin = {
  userUuid: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  status: number;
  emailVerifiedAt: string;
  phoneVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: AuthAuthorities[];
};

export type AuthAuthorities = {
  authority: string;
};

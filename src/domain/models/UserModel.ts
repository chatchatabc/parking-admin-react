export type User = {
  userUuid: string | null | undefined;
  username: string | null | undefined;
  notificationId: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
  phoneVerifiedAt: string | null | undefined;
  emailVerifiedAt: string | null | undefined;

  authorities: UserAuthorities[];
};

export type UserLoginLog = {
  id: string | null | undefined;
  ipAddress: string | null | undefined;
  createdAt: string | null | undefined;

  type: number | null | undefined;

  success: Boolean | null | undefined;
};

export type UserLogoutLog = {
  id: string | null | undefined;
  ipAddress: string | null | undefined;
  createdAt: string | null | undefined;

  type: number | null | undefined;
};

export type UserAuthorities = {
  authority: string;
};

export type UserRoles = {
  name: string;
};

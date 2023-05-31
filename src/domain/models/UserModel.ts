export type User = {
  userUuid?: string | null;
  username?: string | null;
  notificationId?: string | null;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  phoneVerifiedAt?: string | null;
  emailVerifiedAt?: string | null;

  authorities?: UserAuthorities[];
};

export type UserLoginLog = {
  id?: string | null;
  ipAddress?: string | null;
  createdAt?: string | null;

  type?: number | null;

  success?: Boolean | null;
};

export type UserLogoutLog = {
  id?: string | null;
  ipAddress?: string | null;
  createdAt?: string | null;

  type?: number | null;
};

export type UserAuthorities = {
  authority?: string;
};

export type UserRoles = {
  name?: string;
};

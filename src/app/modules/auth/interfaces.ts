export type I_user_login = {
  id: string;
  password: string;
};

export type I_user_logged_in = {
  access_token: string;
  refresh_token?: string;
  needs_password_change: boolean;
};

export type I_refresh_token_response = {
  access_token: string;
};

import * as React from "react";

// require("./styles.scss");

export enum LoginFields {
  Password = "password",
  Username = "username"
}

export enum AddPersonFields {
  FIRSTNAME = "firstName",
  LASTNAME = "lastName"
}

export interface LoginUIProps {
  readonly fields: { [key in LoginFields]: string };
  readonly onFieldChanged: (field: LoginFields, value: string) => void;
  readonly onSave: () => void;
}
export function LoginUI(props: LoginUIProps) {
  const { onSave, onFieldChanged, fields } = props;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onFieldChanged(e.target.name as LoginFields, e.target.value);

  return (
    <div className="login">
      <h2>Login</h2>

      <fieldset>
        <label htmlFor="username">Username</label>
        <input
          name={LoginFields.Username}
          type="text"
          value={fields.username}
          onChange={changeHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          name={LoginFields.Password}
          type="text"
          value={fields.password}
          onChange={changeHandler}
        />
      </fieldset>

      <button onClick={onSave}>Save</button>
    </div>
  );
}

import * as React from "react";

require("./styles.scss");

export enum AddPersonFields {
  FIRSTNAME = "firstName",
  LASTNAME = "lastName"
}

export interface AddPersonUIProps {
  readonly fields: { [key in AddPersonFields]: string };
  readonly onFieldChanged: (field: AddPersonFields, value: string) => void;
  readonly onSave: () => void;
}
export function AddPersonUI(props: AddPersonUIProps) {
  const { onSave, onFieldChanged, fields } = props;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onFieldChanged(e.target.name as AddPersonFields, e.target.value);

  return (
    <div className="add-person">
      <h2>Add Person</h2>

      <fieldset>
        <label htmlFor="name">First Name</label>
        <input
          name={AddPersonFields.FIRSTNAME}
          type="text"
          value={fields.firstName}
          onChange={changeHandler}
        />
        <label htmlFor="name">Last Name</label>
        <input
          name={AddPersonFields.LASTNAME}
          type="text"
          value={fields.lastName}
          onChange={changeHandler}
        />
      </fieldset>

      <button onClick={onSave}>Save</button>
    </div>
  );
}

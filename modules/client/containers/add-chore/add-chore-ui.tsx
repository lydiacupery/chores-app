import * as React from "react";

require("./styles.scss");

export enum AddChoreFields {
  NAME = "name"
}

export enum AddPersonFields {
  FIRSTNAME = "firstName",
  LASTNAME = "lastName"
}

export interface AddChoreUIProps {
  readonly fields: { [key in AddChoreFields]: string };
  readonly onFieldChanged: (field: AddChoreFields, value: string) => void;
  readonly onSave: () => void;
}
export function AddChoreUI(props: AddChoreUIProps) {
  const { onSave, onFieldChanged, fields } = props;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    onFieldChanged(e.target.name as AddChoreFields, e.target.value);

  return (
    <div className="add-chore">
      <h2>Add Chore</h2>

      <fieldset>
        <label htmlFor="name">Chore</label>
        <input
          name={AddChoreFields.NAME}
          type="text"
          value={fields.name}
          onChange={changeHandler}
        />
      </fieldset>

      <button onClick={onSave}>Save</button>
    </div>
  );
}

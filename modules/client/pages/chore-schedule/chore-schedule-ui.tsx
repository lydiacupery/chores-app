import * as React from "react";
import { JobCompletedContainer } from "client/containers/job-completed";

require("./styles.scss");
export interface ChoreRow {
  name: string;
  id: number;
}

export interface PeopleRow {
  firstName: string | null;
  lastName: string | null;
  id: number;
}

export interface ChoreUIProps {
  choreRows: ChoreRow[] | null;
  peopleRows: PeopleRow[] | null;
}
export interface ScheduleRowProps {
  chores: ChoreRow[] | null;
  rowId: number;
  name: string;
}

export const ScheduleRow: React.SFC<ScheduleRowProps> = props => {
  var cells;
  if (props.chores != null) {
    cells = props.chores.map((row, i) => (
      <td key={i}>
        <JobCompletedContainer person={props.rowId} chore={row.id} />
      </td>
    ));
  } else {
    cells = null;
  }
  return (
    <tr key={props.rowId}>
      <th>{props.name}</th>
      {cells}
    </tr>
  );
};

export const SnackReportUI: React.SFC<ChoreUIProps> = props => {
  if (props.choreRows === null || props.peopleRows === null) {
    return <div>Loading...</div>;
  } else if (props.choreRows.length === 0 && props.peopleRows.length === 0) {
    return <div>No chores or people to show.</div>;
  } else {
    const choreRows = props.choreRows.map((row, i) => (
      <th key={i}>{row.name}</th>
    ));

    const peopleRows = props.peopleRows.map((row, i) => (
      <ScheduleRow
        key={i}
        name={(row.firstName || "") + " " + (row.lastName || "")}
        rowId={row.id}
        chores={props.choreRows}
      />
    ));

    return (
      <div className="chore-list">
        <table className="all">
          <thead>
            <tr>
              <th className="empty" />
              {choreRows}
            </tr>
          </thead>
          <tbody>{peopleRows}</tbody>
        </table>
      </div>
    );
  }
};

import * as React from "react";
import {
  fromString,
  hourMinutesFromTimestamp,
  dayOfMonthFromTimestamp
} from "core/timestamp";

require("./styles.scss");

export interface JobCompletedUIProps {
  date: string | null;
  isTurn: boolean;
}

export function JobCompletedUI(props: JobCompletedUIProps) {
  var dayOfMonth = null;
  if (props.date != null) {
    var timeFromString = fromString(props.date);
    if (timeFromString != null) {
      dayOfMonth = dayOfMonthFromTimestamp(timeFromString);
    }
  }
  var isTurn = <div />;
  if (props.isTurn) {
    isTurn = <div className="is-turn">Your turn</div>;
  }
  return (
    <div>
      {isTurn}
      <div className="date-month">{dayOfMonth}</div>
    </div>
  );
}

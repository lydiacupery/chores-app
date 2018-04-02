import * as React from "react";
import { fromString, dayOfMonthFromTimestamp } from "core/timestamp";

require("./styles.scss");

export interface JobCompletedUIProps {
  date: string | null;
  isTurn: boolean;
  onCompleted: () => void;
  onSkipped: () => void;
  skip?: boolean;
}

export function JobCompletedUI(props: JobCompletedUIProps) {
  let dayOfMonth = null;
  let skip = props.skip ? "SKIP" : "";
  if (props.date != null) {
    var timeFromString = fromString(props.date);
    if (timeFromString != null) {
      dayOfMonth = dayOfMonthFromTimestamp(timeFromString);
    }
  }
  var display = <div />;
  if (props.isTurn) {
    display = (
      <button className="is-turn" onClick={props.onCompleted}>
        Complete Chore
      </button>
    );
  } else {
    display = (
      <div className="date-month">
        {dayOfMonth} {skip}
        <button onClick={props.onSkipped}>SKIP</button>
      </div>
    );
  }
  return <div>{display}</div>;
}

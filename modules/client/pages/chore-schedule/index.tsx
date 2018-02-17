import { ScheduleQuery } from "client/graphql-types";
import {
  ChoreRow,
  ChoreUIProps,
  SnackReportUI,
  PeopleRow
} from "client/pages/chore-schedule/chore-schedule-ui";
import { graphql } from "react-apollo";

export function dataToChoreRows(data: ScheduleQuery): ChoreRow[] {
  if (!data.allChores || !data.allChores) {
    return [];
  }
  return data.allChores.map((row, index) => ({
    name: row.name,
    id: row.id
  }));
}

export function dataToPeopleRows(data: ScheduleQuery): PeopleRow[] {
  if (!data.allPeople || !data.allPeople) {
    return [];
  }
  debugger;
  return data.allPeople.map((row, index) => ({
    firstName: row.firstName,
    lastName: row.lastName,
    id: row.id
  }));
}

const wireToApollo = graphql<
  ScheduleQuery,
  {},
  ChoreUIProps
>(require("client/graphql-queries/Schedule.graphql"), {
  props(result): ChoreUIProps {
    if (!result.data || result.data.loading) {
      return { choreRows: null, peopleRows: null };
    } else {
      return {
        choreRows: dataToChoreRows(result.data),
        peopleRows: dataToPeopleRows(result.data)
      };
    }
  }
});

export const ChoreSchedulePage = wireToApollo(SnackReportUI);

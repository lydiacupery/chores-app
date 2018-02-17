import { graphql } from "react-apollo";
import {
  ChoreEventQuery,
  ChoreEventQueryVariables
} from "client/graphql-types";
import {
  JobCompletedUIProps,
  JobCompletedUI
} from "client/containers/job-completed/job-completed-ui";
import * as _ from "lodash";

export function dataToMostRecentDate(data: ChoreEventQuery): string | null {
  var choreEvents = data.choreEvents;
  if (!choreEvents || choreEvents.length == 0) {
    return null;
  }
  //todo, refactor so can do this in graphql vs here
  var choreEventsWithChores = choreEvents.filter(
    choreEvent => choreEvent != null && choreEvent.date != null
  );
  if (choreEventsWithChores.length == 0) {
    return null;
  }
  var sorted = choreEventsWithChores
    .sort(function(a, b) {
      if (a == null || a.date == null) {
        return -1;
      }
      if (b == null || b.date == null) {
        return 1;
      }
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    })
    .map(x => (x ? x.date : null));
  return sorted[0];
}

export function whoseTurnToBoolean(
  person: number,
  data: ChoreEventQuery
): boolean {
  if (data.whoseTurn != null) {
    if (person == data.whoseTurn.id) {
      return true;
    }
  }
  return false;
}

const wireToApollo = graphql<
  ChoreEventQuery,
  { person: number; chore: number },
  JobCompletedUIProps
>(require("client/graphql-queries/ChoreEvent.graphql"), {
  options(props) {
    const variables: ChoreEventQueryVariables = {
      person: props.person,
      chore: props.chore
    };
    return { variables };
  },

  props(result): JobCompletedUIProps {
    if (!result.data || result.data.loading) {
      return { date: null, isTurn: false };
    } else {
      return {
        date: dataToMostRecentDate(result.data),
        isTurn: whoseTurnToBoolean(result.ownProps.person, result.data)
      };
    }
  }
});

export const JobCompletedContainer = wireToApollo(JobCompletedUI);

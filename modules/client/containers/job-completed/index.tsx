import { graphql, withApollo } from "react-apollo";
import {
  ChoreEventQuery,
  ChoreEventQueryVariables
} from "client/graphql-types";
import {
  JobCompletedUIProps,
  JobCompletedUI
} from "client/containers/job-completed/job-completed-ui";
import * as _ from "lodash";
import ApolloClient from "apollo-client";
import { addEventMutation } from "client/graphql-mutations/add-event-mutation";
import * as Timestamp from "core/timestamp";
import { addEventAndIncrementMutation } from "client/graphql-mutations/add-event-and-increment-mutation";

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
  console.log("sorted list", sorted);
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

//todo, refafctor this is a super crappy method
export function isMostRecentASkip(data: ChoreEventQuery | undefined): boolean {
  if (data == undefined) {
    return false;
  }
  var choreEvents = data.choreEvents;
  if (!choreEvents || choreEvents.length == 0) {
    return false;
  }
  //todo, refactor so can do this in graphql vs here
  var choreEventsWithChores = choreEvents.filter(
    choreEvent => choreEvent != null && choreEvent.date != null
  );
  if (choreEventsWithChores.length == 0) {
    return false;
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
    .map(x => (x ? x.skip : null));
  if (sorted[0]) {
    return true;
  }
  return false;
}

const wireToApollo = graphql<
  ChoreEventQuery,
  { person: number; chore: number } & { client: ApolloClient },
  JobCompletedUIProps
>(require("client/graphql-queries/ChoreEvent.graphql"), {
  options(props) {
    const variables: ChoreEventQueryVariables = {
      person: props.person,
      chore: props.chore
    };
    return { variables, pollInterval: 100 }; //TODO: poll interval because of lazy coding, should update so all squares get info from one query
    //altenative, easier solution, make a query for a list of skips, if element is in the skips, then will display as a skip
  },

  props(result): JobCompletedUIProps {
    if (!result.data || result.data.loading) {
      return {
        date: null,
        isTurn: false,
        onCompleted: () => console.log("loading state"),
        onSkipped: () => console.log("skip")
      };
    } else {
      return {
        date: dataToMostRecentDate(result.data),
        isTurn: whoseTurnToBoolean(result.ownProps.person, result.data),
        skip: isMostRecentASkip(result.data),
        onCompleted: () => {
          console.log("mutation");
          addEventAndIncrementMutation(result.ownProps.client, {
            personId: result.ownProps.person,
            choreId: result.ownProps.chore,
            date: Timestamp.nowInUtc()
          });
          /*do thing*/
          //use result.ownProps.chore & result.ownProps.person
        },
        onSkipped: () => {
          console.log("skipped");
          addEventMutation(result.ownProps.client, {
            personId: result.ownProps.person,
            choreId: result.ownProps.chore,
            date: Timestamp.nowInUtc(),
            skip: true
          });
        }
      };
    }
  }
});

export const JobCompletedContainer = withApollo(wireToApollo(JobCompletedUI));

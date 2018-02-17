import { withContext } from "__tests__/db-helpers";
import { ChoreEventQuery } from "client/graphql-types";

describe("Chore Event query", () => {
  it(
    "Returns empty list when there is no chore event associated with a person and chore"
  );
  withContext(async context => {
    const graphql = context.apolloClient;

    const chore1 = await context.choreRepository.insert({ name: "chore1" });
    const person1 = await context.PersonRepository.insert({
      firstName: "maria",
      lastName: "cupery"
    });

    await Promise.all([
      context.ChoreEventRepository.insert({
        personId: person1.id,
        choreId: chore1.id,
        date: "2017-12-26T13:17:59-05:00"
      })
    ]);

    const result = await graphql.query<ChoreEventQuery>({
      query: require("../ChoreEvent.graphql"),
      variables: {
        person: person1.id + 1,
        chore: chore1.id + 1
      }
    });

    if (!result.data || !result.data.choreEvents) {
      throw "no chore events came back!";
    }

    expect(result.data.choreEvents.length).toEqual(0);
  });

  it(
    "Returns chore event associated with a person and chore",
    withContext(async context => {
      const graphql = context.apolloClient;

      const chore1 = await context.choreRepository.insert({ name: "chore1" });
      const person1 = await context.PersonRepository.insert({
        firstName: "maria",
        lastName: "cupery"
      });

      await Promise.all([
        context.ChoreEventRepository.insert({
          personId: person1.id,
          choreId: chore1.id,
          date: "2017-12-26T13:17:59-05:00"
        })
      ]);

      const result = await graphql.query<ChoreEventQuery>({
        query: require("../ChoreEvent.graphql"),
        variables: {
          person: person1.id,
          chore: chore1.id
        }
      });

      if (!result.data || !result.data.choreEvents) {
        throw "no chore events came back!";
      }

      expect(result.data.choreEvents.length).toEqual(1);

      const choreResult = result.data.choreEvents[0];

      if (
        choreResult == null ||
        choreResult.chore == null ||
        choreResult.person == null
      ) {
        throw "chore result, chore, or person should not be null";
      } else {
        expect(choreResult.chore.id).toEqual(chore1.id);
        expect(choreResult.person.id).toEqual(person1.id);
      }
    })
  );
});

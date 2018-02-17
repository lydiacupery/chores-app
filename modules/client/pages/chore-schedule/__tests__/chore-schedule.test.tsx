import { mockProvider, MockList } from "client/test-helpers/mock-apollo";
import * as React from "react";
import { mount } from "enzyme";
import { ChoreSchedulePage } from "client/pages/chore-schedule";
import { sleep } from "helpers";
import { ScheduleRow } from "client/pages/chore-schedule/chore-schedule-ui";

describe("Home page", () => {
  it("Begins in a loading state", () => {
    const Provider = mockProvider();

    const page = mount(
      <Provider>
        <ChoreSchedulePage />
      </Provider>
    );

    expect(page.text()).toContain("Loading");
  });

  it("Shows a message if there are no people or chores", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          allPeople: () => new MockList(0),
          allChores: () => new MockList(0)
        })
      }
    });

    const page = mount(
      <Provider>
        <ChoreSchedulePage />
      </Provider>
    );

    await sleep(0);

    expect(page.text()).toContain("No chores or people to show.");
  });

  it("Shows only people in the grid if there are people and no chores", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          allPeople: () => [
            { firstName: "lydia", lastName: "cupery", id: 1 },
            { firstName: "maria", lastName: "cupery", id: 2 }
          ],
          allChores: () => new MockList(0)
        })
      }
    });

    const page = mount(
      <Provider>
        <ChoreSchedulePage />
      </Provider>
    );

    await sleep(0);

    const choreHeaders = page.find("thead tr th");
    const emptyHeaders = page.find(".empty");
    expect(choreHeaders.length - emptyHeaders.length).toBe(0);

    const scheduleRows = page.find(ScheduleRow);

    expect(scheduleRows.length).toBe(2);

    const firstPerson = scheduleRows.filterWhere(e =>
      e.text().includes("lydia cupery")
    );
    expect(firstPerson.length).toBe(1);

    const secondPerson = scheduleRows.filterWhere(e =>
      e.text().includes("maria cupery")
    );
    expect(secondPerson.length).toBe(1);
  });

  it("Shows only people in the grid if there are chores and no people", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          allPeople: () => new MockList(0),
          allChores: () => [
            { id: 1, name: "sweep" },
            { id: 2, name: "dust" },
            { id: 3, name: "bathroom" }
          ]
        })
      }
    });

    const page = mount(
      <Provider>
        <ChoreSchedulePage />
      </Provider>
    );

    await sleep(0);

    const choreHeaders = page.find("thead tr th");
    const emptyHeaders = page.find(".empty");
    expect(choreHeaders.length - emptyHeaders.length).toBe(3);

    const firstChore = choreHeaders.filterWhere(c =>
      c.text().includes("sweep")
    );
    const secondChore = choreHeaders.filterWhere(c =>
      c.text().includes("dust")
    );
    const thirdChore = choreHeaders.filterWhere(c =>
      c.text().includes("bathroom")
    );

    expect(firstChore.length).toBe(1);
    expect(secondChore.length).toBe(1);
    expect(thirdChore.length).toBe(1);

    const scheduleRows = page.find(ScheduleRow);

    expect(scheduleRows.length).toBe(0);
  });

  it("Shows only people in the grid if there are chores and people", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          allPeople: () => [
            { firstName: "lydia", lastName: "cupery", id: 1 },
            { firstName: "maria", lastName: "cupery", id: 2 }
          ],
          allChores: () => [
            { id: 1, name: "sweep" },
            { id: 2, name: "dust" },
            { id: 3, name: "bathroom" }
          ]
        })
      }
    });

    const page = mount(
      <Provider>
        <ChoreSchedulePage />
      </Provider>
    );

    await sleep(0);

    const choreHeaders = page.find("thead tr th");
    const emptyHeaders = page.find(".empty");
    expect(choreHeaders.length - emptyHeaders.length).toBe(3);

    const firstChore = choreHeaders.filterWhere(c =>
      c.text().includes("sweep")
    );
    const secondChore = choreHeaders.filterWhere(c =>
      c.text().includes("dust")
    );
    const thirdChore = choreHeaders.filterWhere(c =>
      c.text().includes("bathroom")
    );

    expect(firstChore.length).toBe(1);
    expect(secondChore.length).toBe(1);
    expect(thirdChore.length).toBe(1);

    const scheduleRows = page.find(ScheduleRow);

    expect(scheduleRows.length).toBe(2);

    const firstPerson = scheduleRows.filterWhere(e =>
      e.text().includes("lydia cupery")
    );
    expect(firstPerson.length).toBe(1);

    const secondPerson = scheduleRows.filterWhere(e =>
      e.text().includes("maria cupery")
    );
    expect(secondPerson.length).toBe(1);
  });
});

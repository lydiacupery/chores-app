import { ScheduleQuery } from "client/graphql-types";
import { dataToChoreRows, dataToPeopleRows } from "client/pages/chore-schedule";
import {
  ChoreRow,
  PeopleRow
} from "client/pages/chore-schedule/chore-schedule-ui";

describe("ChoresSchedule.dataToRows", () => {
  it("handles a failed lookup", () => {
    const data: ScheduleQuery = {
      allChores: null,
      allPeople: null
    };

    expect(dataToChoreRows(data)).toEqual([]);
    expect(dataToPeopleRows(data)).toEqual([]);
  });
  it("creates valid rows with incrementing place counts", () => {
    const data: ScheduleQuery = {
      allChores: [
        {
          id: 29,
          name: "Kitchen"
        },
        {
          id: 79,
          name: "Bathroom"
        }
      ],
      allPeople: [
        {
          firstName: "Lydia",
          lastName: "Cupery",
          id: 1
        }
      ]
    };

    const expectedChoreRows: ChoreRow[] = [
      {
        name: "Kitchen",
        id: 29
      },
      {
        name: "Bathroom",
        id: 79
      }
    ];

    const expectedPeopleRows: PeopleRow[] = [
      {
        firstName: "Lydia",
        lastName: "Cupery",
        id: 1
      }
    ];

    expect(dataToChoreRows(data)).toEqual(expectedChoreRows);
    expect(dataToPeopleRows(data)).toEqual(expectedPeopleRows);
  });
});

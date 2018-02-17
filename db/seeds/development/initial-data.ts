import * as Knex from "knex";
const moment = require("moment");
const _ = require("lodash");

exports.seed = async function(knex: Knex) {
  await knex("votes").del();
  await knex("snacks").del();

  const chipsId = _.parseInt(
    await knex("snacks").insert({ name: "Chips" }, "id")
  );
  const guacId = _.parseInt(
    await knex("snacks").insert({ name: "Guac" }, "id")
  );
  const pizzaId = _.parseInt(
    await knex("snacks").insert({ name: "Pizza" }, "id")
  );
  const chocolatePieId = _.parseInt(
    await knex("snacks").insert({ name: "Chocolate Pie" }, "id")
  );

  const sweepId = _.parseInt(
    await knex("chore").insert({ name: "Sweep" }, "id")
  );
  const kitchenId = _.parseInt(
    await knex("chore").insert({ name: "Kitchen" }, "id")
  );
  const floorId = _.parseInt(
    await knex("chore").insert({ name: "Floor" }, "id")
  );
  const bathroomId = _.parseInt(
    await knex("chore").insert({ name: "Bathroom" }, "id")
  );
  const person1Id = _.parseInt(
    await knex("person").insert({ firstName: "Person1" }, "id")
  );
  const person2Id = _.parseInt(
    await knex("person").insert({ firstName: "Person2" }, "id")
  );

  const todayDate = moment().format();
  await knex("choreevent").insert(
    {
      personId: person1Id,
      choreId: sweepId,
      date: todayDate
    },
    "id"
  );
  await knex("choreevent").insert(
    { personId: person1Id, choreId: kitchenId, date: todayDate },
    "id"
  );
  await knex("choreevent").insert(
    { personId: person1Id, choreId: bathroomId, date: todayDate },
    "id"
  );

  await Promise.all(
    _.times(3).map(async () => {
      await knex("votes").insert({ snackId: guacId });
    })
  );
  await Promise.all(
    _.times(2).map(async () => {
      await knex("votes").insert({ snackId: chipsId });
    })
  );
  await Promise.all(
    _.times(1).map(async () => {
      await knex("votes").insert({ snackId: chocolatePieId });
    })
  );
};

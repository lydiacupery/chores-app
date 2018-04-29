import * as Knex from "knex";

exports.up = async function(knex: Knex) {
  await knex.schema.createTable("snacks", table => {
    table.increments("id");
    table
      .string("name")
      .notNullable()
      .unique();
  });

  await knex.schema.createTable("votes", table => {
    table.increments("id");
    table
      .integer("snackId")
      .notNullable()
      .index();
    table
      .foreign("snackId")
      .references("snacks.id")
      .onDelete("CASCADE");
    table
      .dateTime("createdAt")
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("chore", table => {
    table.increments("id");
    table
      .string("name")
      .notNullable()
      .unique();
  });

  await knex.schema.createTable("person", table => {
    table.increments("id");
    table.string("firstName");
    table.string("lastName");
  });

  await knex.schema.createTable("personorder", table => {
    table.increments("id");
    table
      .integer("personId")
      .unique()
      .notNullable()
      .index();
    table.integer("order").notNullable();
    table
      .foreign("personId")
      .references("person.id")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("currentturn", table => {
    table.increments("id");
    table
      .integer("personId")
      .notNullable()
      .index();
    table
      .integer("choreId")
      .notNullable()
      .index();
  });

  await knex.schema.createTable("choreevent", table => {
    table.increments("id");
    table.string("date");
    table
      .integer("personId")
      .notNullable()
      .index();
    table
      .integer("choreId")
      .notNullable()
      .index();
    table.boolean("skip");
    table
      .foreign("personId")
      .references("person.id")
      .onDelete("CASCADE");
    table
      .foreign("choreId")
      .references("chore.id")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("users", table => {
    table.increments("id");
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
  });
};

exports.down = async function(knex: Knex) {
  await knex.schema.dropTable("votes");
  await knex.schema.dropTable("snacks");
  await knex.schema.dropTable("choreevent");
  await knex.schema.dropTable("personorder");
  await knex.schema.dropTable("chore");
  await knex.schema.dropTable("person");
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("currentturn");
};

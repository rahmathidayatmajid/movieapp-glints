'use strict';

const tableName = "MovieCharacters";

const fkName = "movieId_on_moviecharacters_fk";

module.exports = {
  up: (queryInterFace, sequelize) => queryInterFace.addConstraint(tableName, {
    fields: ["movieId"],
    type: 'foreign key',
    name: fkName,
    references: {
      table: 'Movies',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterFace, sequelize) => queryInterFace.removeConstraint(tableName, fkName)
};
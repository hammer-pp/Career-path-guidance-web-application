exports.up = function(knex) {
    return knex.schema.alterTable('recommendations', function(table) {
      table.dropForeign('majorcareerid');
      table.dropColumn('majorcareerid');
      table.integer('careerid').unsigned();
  
      table.foreign('careerid')
        .references('careerid')
        .inTable('careers')
        .onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('recommendations', function(table) {
      table.dropForeign('careerid');
      table.dropColumn('careerid');
      table.integer('majorcareerid').unsigned();
  
      table.foreign('majorcareerid')
        .references('majorcareerid')
        .inTable('major_career')
        .onDelete('CASCADE');
    });
  };
  
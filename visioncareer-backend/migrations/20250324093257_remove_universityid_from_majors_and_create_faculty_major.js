exports.up = async function(knex) {
  // 1. ลบ universityid ออกจาก majors
  await knex.schema.alterTable('majors', function(table) {
    table.dropColumn('universityid');
  });

  // 2. ลบ majorid ออกจาก faculties
  await knex.schema.alterTable('faculties', function(table) {
    table.dropColumn('majorid');
  });

  // 3. สร้างตาราง faculty_major
  await knex.schema.createTable('faculty_major', function(table) {
    table.increments('facultymajorid').primary();
    table.integer('facultyid').unsigned().references('facultyid').inTable('faculties').onDelete('CASCADE');
    table.integer('majorid').unsigned().references('majorid').inTable('majors').onDelete('CASCADE');
  });
};

exports.down = async function(knex) {
  // 1. ลบตาราง faculty_major
  await knex.schema.dropTableIfExists('faculty_major');

  // 2. เพิ่ม majorid กลับไปยัง faculties
  await knex.schema.alterTable('faculties', function(table) {
    table.integer('majorid').unsigned().references('majorid').inTable('majors');
  });

  // 3. เพิ่ม universityid กลับไปยัง majors
  await knex.schema.alterTable('majors', function(table) {
    table.integer('universityid').unsigned().references('universityid').inTable('universities');
  });
};

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminUser_1759328647004 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO `user`(`email`,`password`,`first_name`,`last_name`,`roles`) \
      VALUES ('admin@toalmoal.com','$2a$10$QbJgQLBZ73HiygQewgBqp.udsXMkUX4qdVl2rDX3I8PkrjEdLACy2','Administrator',NULL,'Admin')"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "DELETE FROM `user` WHERE `email` in ('admin@toalmoal.com')"
    );
  }

}

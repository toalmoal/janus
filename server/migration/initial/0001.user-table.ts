import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable_1759328647073 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (\
        `id` bigint NOT NULL AUTO_INCREMENT,\
        `email` varchar(256) NOT NULL,\
        `password` varchar(128) NOT NULL,\
        `first_name` varchar(128) NOT NULL,\
        `last_name` varchar(128) DEFAULT NULL,\
        `roles` varchar(256) NOT NULL,\
        `disabled` bit DEFAULT 0,\
        `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),\
        `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),\
        PRIMARY KEY (`id`)\
      )'
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `user-email-idx` ON `user`(`email`)'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE `user`'
    );
  }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class LoginHistoryTable_1759329168210 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `login_history` (\
        `id` bigint NOT NULL AUTO_INCREMENT,\
        `email` varchar(256) NOT NULL,\
        `ip_address` varchar(19) DEFAULT NULL,\
        `success` tinyint(1) NOT NULL,\
        `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),\
        PRIMARY KEY (`id`)\
      )'
    );
    await queryRunner.query(
      'CREATE INDEX `login_history-email-idx` ON `login_history`(`email`)'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE `login_history`'
    );
  }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordResetTable_1759328647003 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `password_reset` (\
        `id` bigint NOT NULL AUTO_INCREMENT,\
        `user_id` bigint NOT NULL,\
        `code` varchar(6) NOT NULL,\
        `used` bit DEFAULT 0,\
        `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),\
        `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),\
        PRIMARY KEY (`id`)\
      )'
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `password_reset-user_id-idx` ON `password_reset`(`user_id`)'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TABLE `password_reset`'
    );
  }

}

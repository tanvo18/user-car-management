import { MigrationInterface, QueryRunner } from 'typeorm';

export class initModel1672643274563 implements MigrationInterface {
  name = 'initModel1672643274563'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."user_roles_rolename_enum" AS ENUM('admin', 'user')`);
    await queryRunner.query(`CREATE TABLE "user_roles" ("id" SERIAL NOT NULL, "roleName" "public"."user_roles_rolename_enum" NOT NULL, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "name" character varying, "email" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "model" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TYPE "public"."availability_status_enum" AS ENUM('available', 'booked')`);
    await queryRunner.query(`CREATE TABLE "availability" ("id" SERIAL NOT NULL, "date" date NOT NULL, "price" double precision NOT NULL, "status" "public"."availability_status_enum" NOT NULL DEFAULT 'available', "carId" integer, CONSTRAINT "PK_05a8158cf1112294b1c86e7f1d3" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user_roles_maps" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_b168c3a6e5eb15a3f49a6ec4bb4" PRIMARY KEY ("user_id", "role_id"))`);
    await queryRunner.query(`CREATE INDEX "IDX_b12e5e3c4e5b74dd6c9d6a9f01" ON "user_roles_maps" ("user_id") `);
    await queryRunner.query(`CREATE INDEX "IDX_876686046dbb8e37d9e4b2438a" ON "user_roles_maps" ("role_id") `);
    await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "availability" ADD CONSTRAINT "FK_c1a59073dded122bdd36b637ceb" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user_roles_maps" ADD CONSTRAINT "FK_b12e5e3c4e5b74dd6c9d6a9f014" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "user_roles_maps" ADD CONSTRAINT "FK_876686046dbb8e37d9e4b2438a9" FOREIGN KEY ("role_id") REFERENCES "user_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_roles_maps" DROP CONSTRAINT "FK_876686046dbb8e37d9e4b2438a9"`);
    await queryRunner.query(`ALTER TABLE "user_roles_maps" DROP CONSTRAINT "FK_b12e5e3c4e5b74dd6c9d6a9f014"`);
    await queryRunner.query(`ALTER TABLE "availability" DROP CONSTRAINT "FK_c1a59073dded122bdd36b637ceb"`);
    await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_876686046dbb8e37d9e4b2438a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b12e5e3c4e5b74dd6c9d6a9f01"`);
    await queryRunner.query(`DROP TABLE "user_roles_maps"`);
    await queryRunner.query(`DROP TABLE "availability"`);
    await queryRunner.query(`DROP TYPE "public"."availability_status_enum"`);
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TYPE "public"."user_roles_rolename_enum"`);
  }

}

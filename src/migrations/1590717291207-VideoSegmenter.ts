import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class VideoSegmenter1590717291207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "video_segmenter",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "uuid",
            type: "varchar",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "size",
            type: "int",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}

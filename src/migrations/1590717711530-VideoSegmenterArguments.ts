import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class VideoSegmenterArguments1590717711530
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "video_segmenter_arguments",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "init_process",
            type: "timestamp",
          },
          {
            name: "init_save",
            type: "timestamp",
          },
          {
            name: "end_save",
            type: "timestamp",
          },
          {
            name: "error_segmenter",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "error_saving",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "arguments_process",
            type: "varchar",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.addColumn(
      "video_segmenter_arguments",
      new TableColumn({
        name: "video_segmenter_id",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "video_segmenter_arguments",
      new TableForeignKey({
        columnNames: ["video_segmenter_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "video_segmenter",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  ObjectID,
  ObjectIdColumn,
  Entity,
  ManyToOne,
  BaseEntity
} from "typeorm";

import {VideoSegmenterArgument} from './video.segmenter.arguments'
import { Transform } from "class-transformer";

@Entity()
export class VideoSegmenter {
  @Transform( (id: ObjectID) => id.toHexString(), {toPlainOnly:true} )
  @ObjectIdColumn({ name: "_id" })
  id?: ObjectID;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  url?: string;

  @Column()
  initSave?: Date;

  @Column()
  endSave?: Date;

  @Column()
  errorSave?: string;

  @ManyToOne( type => VideoSegmenterArgument, videoSegmenterArgument => videoSegmenterArgument.videoSegmenter)
  videoSegmenterArguments?: VideoSegmenterArgument[]
}


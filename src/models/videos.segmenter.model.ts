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

import {VideoSegmenterArgument} from './v1/video.segmenter.arguments'

@Entity()
export class VideoSegmenter {
  @ObjectIdColumn({ name: "_id" })
  id: ObjectID;

  @Column()
  size: number;

  @Column()
  url: string;

  @ManyToOne( type => VideoSegmenterArgument, videoSegmenterArgument => videoSegmenterArgument.videoSegmenter)
  videoSegmenterArguments: VideoSegmenterArgument[]
}


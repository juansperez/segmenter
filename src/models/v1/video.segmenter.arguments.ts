import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany
} from "typeorm";

import {VideoSegmenter} from '../videos.segmenter.model'

@Entity("video_segmenter_arguments")
export class VideoSegmenterArgument {
  @ObjectIdColumn({ name: "_id" })
  id: ObjectID;

  @Column()
  sizeSegmenter: number;

  @Column()
  fileName: string;

  @Column()
  url: string;

  @Column()
  argumentsProcess: string[]

  @Column()
  initProcess: Date;

  @Column()
  endProcess: Date;

  @Column()
  initSave: Date;

  @Column()
  endSave: Date;

  @Column()
  initSegmenter: Date;

  @Column()
  endSegmenter: Date;

  @Column()
  errorSegmenter: string;

  @Column()
  errorSaving: string;

  @OneToMany( type => VideoSegmenter, videoSegmenter => videoSegmenter.videoSegmenterArguments)
  videoSegmenter: VideoSegmenter[];
}

import mongoose from "../db/moogoose.connection";
import { IVideoSegmenterArguments } from "./video-segmenter-argements.interface";

export interface IVideoSegmenter extends mongoose.Document {
  name: string;
  size: number;
  url: string;
  videoSegmenterArguments: IVideoSegmenterArguments[];
}

import mongoose from "../db/moogoose.connection";

export interface IVideoSegmenterArguments extends mongoose.Document {
  fileName?: string;
  argumentsProcess?: string[];
  sizeSegmenter?: number;
  url?: string;
  initProcess?: Date;
  endProcess?: Date;
  initSave?: Date;
  endSave?: Date;
  initSegmenter?: Date;
  endSegmenter?: Date;
  errorSegmenter?: Error;
  errorSaving?: Error;
}

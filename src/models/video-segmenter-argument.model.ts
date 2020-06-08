import mongoose from "../db/moogoose.connection";
import { IVideoSegmenterArguments } from "../interfaces/video-segmenter-argements.interface";

export const videoSegmenterArgument = new mongoose.Schema({
  sizeSegmenter: {
    type: Number,
  },
  fileName: {
    type: String,
  },
  url: {
    type: String,
  },
  argumentsProcess: {
    type: Array,
  },
  initProcess: {
    type: Date,
  },
  endProcess: {
    type: Date,
  },
  initSave: {
    type: Date,
  },
  endSave: {
    type: Date,
  },
  initSegmenter: {
    type: Date,
  },
  endSegmenter: {
    type: Date,
  },
  errorSegmenter: {
    type: String,
  },
  errorSaving: {
    type: String,
  },
});

const VideoSegmenterArgument = mongoose.model(
  "video_segmenter_arguments",
  videoSegmenterArgument
);

export default VideoSegmenterArgument;

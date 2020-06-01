import mongoose from "../db/moogoose.connection";

import { videoSegmenterArgument } from "./video-segmenter-argument.model";
import { IVideoSegmenter } from "../interfaces/video-segmenter.interface";

const videoSegmenter = new mongoose.Schema({
  name: {
    type: String,
  },
  size: {
    type: Number,
  },
  url: {
    type: String,
  },
  videoSegmenterArguments: [videoSegmenterArgument],
});

const VideoSegmenter = mongoose.model<IVideoSegmenter>(
  "video_segmenters",
  videoSegmenter
);

export default VideoSegmenter;

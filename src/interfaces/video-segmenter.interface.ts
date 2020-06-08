import { IVideoSegmenterArguments } from "./video-segmenter-argements.interface";

export interface IVideoSegmenter {
  name: string;
  size: number;
  url: string;
  videoSegmenterArguments: IVideoSegmenterArguments[];
}

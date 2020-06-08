export interface IVideoSegmenterArguments {
  id?:string;
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

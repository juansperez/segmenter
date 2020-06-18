import { ChildProcess, spawn, SpawnOptions } from "child_process";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { IVideoSegmenter } from "../../interfaces/video-segmenter.interface";
import { IVideoSegmenterArguments } from "../../interfaces/video-segmenter-argements.interface";
import VideoSegmenterArgument from "../../models/video-segmenter-argument.model";
import VideoSegmenter from "../../models/video-segmenter.model";
import logger from "../../utils/logger/logger.util";

export class BrokerSegmenter {
  private readonly source: string;
  private readonly mediaArguments: string[];
  private readonly mediaPath: string;
  private readonly file: Express.Multer.File;
  private videoSegmenter: IVideoSegmenter;
  private videoSegmenterArguments: IVideoSegmenterArguments = new VideoSegmenterArgument();

  constructor(
    file: Express.Multer.File,
    configArguments: string[],
    version: string,
    videoSegmenterInit: IVideoSegmenter
  ) {
    this.videoSegmenter = videoSegmenterInit;
    this.videoSegmenterArguments.initProcess = new Date();
    this.videoSegmenterArguments.fileName =
    videoSegmenterInit._id + "-" + version;
    this.videoSegmenterArguments.argumentsProcess = configArguments;
    this.videoSegmenterArguments.url = `http://localhost:3000/videos/${videoSegmenterInit._id}-${version}.webm`;
    this.videoSegmenterArguments.versionSegmenter = version;
    console.log('version', version)
    this.file = file;
    this.source = resolve(`data/${file.originalname}`);
    this.mediaArguments = configArguments;
    this.mediaPath = resolve(
      `data/converteds/${videoSegmenterInit._id}-${version}.webm`
    );
  }

  saveInDisk(): boolean {
    try {
      this.videoSegmenterArguments.initSave = new Date();
      this.videoSegmenter.startSave = new Date();
      // strategy storage
      writeFileSync(this.source, this.file.buffer);
      this.videoSegmenter.url = `http://localhost:3000/video_originals/${this.file.originalname}`;
      this.videoSegmenterArguments.endSave = new Date();
      this.videoSegmenter.endSave = new Date();
      return true;
    } catch (error) {
      logger.error(error);
      this.videoSegmenterArguments.errorSaving = error;
      this.videoSegmenter.errorSaving = error;

      return false;
    }
  }

  // debe cumplir: la declaracion no recibe parametros y retornar obligatoriamente algo
  private get childProcess(): ChildProcess {
    const args: string[] = [
      "-i",
      this.source,
      ...this.mediaArguments,
      this.mediaPath,
      "-y",
    ];
    const options: SpawnOptions = {
      detached: false,
      // stdio: 'ignore'
      stdio: "inherit",
    };
    return spawn("ffmpeg", args, options);
  }

  async startEncode(): Promise<number> {
    this.videoSegmenterArguments.initSegmenter = new Date();
    const writeStream = this.childProcess;

    writeStream.once("exit", async (code: number, signal: string) => {
      this.videoSegmenterArguments.endSegmenter = new Date();
      if (!this.videoSegmenterArguments.errorSegmenter) {
        logger.info(this.videoSegmenter.videoSegmenterArguments);
        await this.videoSegmenter.videoSegmenterArguments.push(
          this.videoSegmenterArguments
        );
        logger.info(this.videoSegmenter);
        await this.videoSegmenter.save();
      }
    });
    writeStream.once("error", async (error: Error) => {
      this.videoSegmenterArguments.errorSegmenter = error;
      this.videoSegmenter.videoSegmenterArguments.push(
        this.videoSegmenterArguments
      );
      this.videoSegmenter.save();
    });
    return writeStream.pid;
  }
}

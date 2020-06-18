import { ChildProcess, spawn, SpawnOptions } from "child_process";
import { writeFileSync } from "fs";
import { resolve } from "path";
import {VideoSegmenter} from "../../models/v1/videos.segmenter.model";
import logger from "../../utils/logger/logger.util";
import ConfigArguments from '../../utils/configarguments.util'
import { VideoSegmenterRepository } from "../../repositories/v1/video-segmenter.repository";
import { getCustomRepository } from "typeorm";

export class BrokerSegmenter {
  private readonly source: string;
  private readonly mediaArguments: string[];
  private readonly mediaPath: string;
  private readonly file: Express.Multer.File;
  private videoSegmenter: VideoSegmenter = new VideoSegmenter()

  constructor(
    file: Express.Multer.File,
    private videoSegmenterRepository = getCustomRepository(VideoSegmenterRepository)
  ) {
    this.file = file
    this.videoSegmenter.name = file.originalname;
    this.videoSegmenter.size = file.size;
    this.registerData()
  }

  async registerData (): Promise<any> {
    this.videoSegmenter = await this.videoSegmenterRepository.createVideo(this.videoSegmenter)
    console.log(this.videoSegmenter)
  }

  async saveInDisk(): Promise<boolean> {
    try {
      this.videoSegmenter.initSave = new Date();
      // strategy storage
      writeFileSync(this.source, this.file.buffer);
      this.videoSegmenter.endSave = new Date();
      await this.videoSegmenterRepository.createVideo(this.videoSegmenter);
      return true;
    } catch (error) {
      logger.error(error);
      this.videoSegmenter.errorSave = error;
      logger.info(this.videoSegmenter);
      await this.videoSegmenterRepository.createVideo(this.videoSegmenter);
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
    const writeStream = this.childProcess;

    writeStream.once("exit", async (code: number, signal: string) => {
    });
    writeStream.once("error", async (error: Error) => {
    });
    return writeStream.pid;
  }

  async startMultipleEncode(): Promise<any> {
    ConfigArguments.forEach((element: any) => {
      logger.info(this.videoSegmenter)
    });
  }


}

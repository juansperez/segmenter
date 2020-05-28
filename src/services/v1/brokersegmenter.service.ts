import { ChildProcess, spawn, SpawnOptions } from "child_process";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { SaveTest } from "../savetest.service";
import configArguments from "../../utils/configarguments.util";

export class BrokerSegmenter {
  private readonly source: string;
  private readonly mediaArguments: string[];
  private readonly mediaPath: string;
  private readonly file: Express.Multer.File;
  private test: any = {
    id: null,
    init_process: null,
    name: null,
    size: null,
    arguments_process: null,
    init_save: null,
    end_save: null,
    error_segmenter: null,
    error_saving: null,
  };
  readonly saveTest: SaveTest;

  constructor(file: Express.Multer.File) {
    this.saveTest = new SaveTest(test);
    this.test.init_process = new Date();
    this.test.size = file.size;
    this.test.name = file.originalname;
    this.file = file;
    this.source = resolve(`data/${file.originalname}`);
    // tslint:disable-next-line:max-line-length
    //  this.mediaArguments = ["-vf", "scale=640x480", "-b:v", "750k", "-quality", "good", "-speed", "4", "-crf", "33", "-c:v", "libvpx-vp9", "-c:a", "libopus"];
    this.mediaArguments = [
      "-quality",
      "realtime",
      "-speed",
      "4",
      "-threads",
      "3",
      "-c:v",
      "libvpx-vp9",
      "-c:a",
      "libopus",
    ];
    //  this.mediaArguments = ["-speed", "4", "-threads", "3","-c:v", "libvpx-vp9", "-c:a", "libopus"];
    //  this.mediaArguments = ["-speed", "4","-c:v", "libvpx-vp9", "-c:a", "libopus"];
    //  this.mediaArguments = ["-c:v", "libvpx-vp9", "-c:a", "libopus"];
    this.mediaPath = resolve(`data/converteds/${file.originalname}.webm`);
    this.test.arguments_process = this.mediaArguments;
  }
  // tslint:disable-next-line:max-line-length
  // ffmpeg -i tears_of_steel_1080p.webm -c:v libvpx-vp9 -c:a libopus output.webm

  // tslint:disable-next-line:max-line-length
  // ffmpeg -i /Users/juan/Projects/node/node-core-typeorm/data/31099.mp4 -c:v libvpx-vp9 -c:a libopus /Users/juan/Projects/node/node-core-typeorm/data/converteds/31099.mp4.webm -y
  // --enable-libvpx

  // Config para calidad media y prueba de velocidad
  //  ffmpeg -i tears_of_steel_1080p--00_00_35-00_00_45.webm -vf scale=640x480 \
  //   -b:v 750k -quality good -speed 4 -crf 33 -c:v libvpx-vp9 -c:a libopus \
  //   speed_output.webm

  saveInDisk(): boolean {
    try {
      this.test.init_save = new Date();
      // strategy storage
      writeFileSync(this.source, this.file.buffer);
      this.test.end_save = new Date();
      return true;
    } catch (error) {
      console.error(error);
      this.test.error_saving = error;
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
    // console.log("Comando a ejecutar:", "ffmpeg", ...args);
    return spawn("ffmpeg", args, options);
  }

  startEncode(): number {
    this.test.init_segmenter = new Date();
    const writeStream = this.childProcess;

    writeStream.once("exit", (code: number, signal: string) => {
      this.test.end_segmenter = new Date();
      // console.log("ONCE exit: ", { code, signal });
      if (!this.test.error_segmenter) this.saveTest.add();
    });
    writeStream.once("error", (error: Error) => {
      this.test.error_segmenter = error;
      console.error(error);
      this.saveTest.add();
    });
    return writeStream.pid;
  }

  // startEncode(): Promise <boolean> {
  //   const writeStream = this.childProcess;

  //   return new Promise((resolve, rejected) => {

  //     writeStream.once("exit", (code: number, signal: string) => {
  //       console.log("ONCE exit: ", {code, signal})
  //       resolve(!code);
  //     });
  //     writeStream.once("error", (error: Error) => {
  //       rejected(error);
  //     });

  //   });
  // }
}

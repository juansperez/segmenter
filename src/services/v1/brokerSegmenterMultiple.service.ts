import { ChildProcess, spawn, SpawnOptions } from "child_process";
import { writeFileSync } from "fs";
import { resolve } from "path";
// import { SegmenterTest } from "../segmenenterTest.service";
import { VideoSegmenter } from '../../models/VideoSegmenter'
import { VideoSegmenterArguments } from '../../models/VideoSegmenterArguments'
// import ConfigArguments from "../../utils/configarguments.util";


export class BrokerSegmenterMultiple {
  private readonly source: string;
  private readonly mediaArguments: string[];
  private readonly mediaPath: string;
  private readonly file: Express.Multer.File;
  private uuid: string = '';
  private test: any = {
    id: '',
    uuid: '',
    name: '',
    size: null
  };
  private argumentsSegmentersObject :any = {
    id: null,
    init_process: Date,
    name: null,
    arguments_process: null,
    init_save: null,
    end_save: Date,
    error_segmenter: null,
    error_saving: null,
    video_segmenter_id: 0
  }
  readonly saveTest: VideoSegmenter;

   constructor(file: Express.Multer.File, configArguments: string[], version: string, videoSegmenter: VideoSegmenter) {
    this.saveTest = new VideoSegmenter();
    this.argumentsSegmentersObject.init_process = new Date();
    this.test = videoSegmenter;
    this.argumentsSegmentersObject.video_segmenter_id = videoSegmenter.id;
    this.file = file;
    this.source = resolve(`data/${file.originalname}`);
    this.mediaArguments = configArguments;
    this.mediaPath = resolve(`data/converteds/${file.originalname}${version}.webm`);
    this.argumentsSegmentersObject.arguments_process = this.mediaArguments;
  }


  saveInDisk(): boolean {
    try {
      this.argumentsSegmentersObject.init_save = new Date();
      // strategy storage
      writeFileSync(this.source, this.file.buffer);
      this.argumentsSegmentersObject.end_save = new Date();
      return true;
    } catch (error) {
      console.error(error);
      this.argumentsSegmentersObject.error_saving = error;
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

  async startEncode(): Promise<number>{
    this.argumentsSegmentersObject.init_segmenter = new Date();
    const writeStream = this.childProcess;

    //console.log( this.argumentsSegmentersObject.video_segmenter_id )

    writeStream.once("exit",  async (code: number, signal: string) => {
      this.argumentsSegmentersObject.end_save = new Date();
      if( !this.argumentsSegmentersObject.error_segmenter ){
        const videoSegmenterArgumets = await VideoSegmenterArguments.create({
          videoSegmenter: this.test,
          arguments_process: this.argumentsSegmentersObject.arguments_process,
          init_process: this.argumentsSegmentersObject.init_process,
          init_save: this.argumentsSegmentersObject.init_save,
          end_save: this.argumentsSegmentersObject.end_save,
          error_segmenter: this.argumentsSegmentersObject.error_segmenter,
        })
        videoSegmenterArgumets.save()
      }
    });

    writeStream.once("error", async (error: Error) => {
      this.argumentsSegmentersObject.error_segmenter = error;
      console.error(error);
      const videoSegmenterArgumets = await VideoSegmenterArguments.create({
        videoSegmenter: this.test,
        init_process: this.argumentsSegmentersObject.init_process,
        arguments_process: this.argumentsSegmentersObject.arguments_process,
        init_save: this.argumentsSegmentersObject.init_save,
        end_save: this.argumentsSegmentersObject.end_save,
        error_segmenter: this.argumentsSegmentersObject.error_segmenter,
      })
      videoSegmenterArgumets.save()
      // this.saveTest.add();
    });
    return writeStream.pid;
  }
}
import {
  // Controller,
  // Get,
  // Req,
  // Res,
  // Param,
  JsonController,
  Post,
  UploadedFile,
} from "routing-controllers";

// import logger from '../../utils/logger/logger.util'

// import { Response } from "express";
// import { IRequest } from "../../interfaces/request.interface";

import { BrokerSegmenter } from '../../services/v1/brokermultiplesegmenter.services'

import ConfigArguments from "../../utils/configarguments.util";

// import videoSegmenter from "../../models/video-segmenter.model";

@JsonController("/v1/uploadfiles")
class UploadFilesController {
  @Post("/segmenter")
  async segmenterUpload(@UploadedFile("fileName") file: Express.Multer.File) {
    const brokerSegmenter = new BrokerSegmenter(file);
    if (await brokerSegmenter.saveInDisk()) {
      // return brokerSegmenter.startEncode();
    }
    /*
    const segmenter = new videoSegmenter({
      name: file.originalname,
      size: file.size,
    });

    await segmenter.save();

    ConfigArguments.forEach((element: any) => {
      const brokerSegmenter = new BrokerSegmenter(
        file,
        element.arguments,
        element.version,
        segmenter
      );
      if (brokerSegmenter.saveInDisk()) {
        return brokerSegmenter.startEncode();
      }
    });
    /* */
    return false;
  }
}

export default UploadFilesController;

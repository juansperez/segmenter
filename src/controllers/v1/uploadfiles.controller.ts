import {
  Controller,
  Get,
  Req,
  Res,
  Param,
  JsonController,
  Post,
  UploadedFile,
} from "routing-controllers";
import { Response } from "express";
import { IRequest } from "../../interfaces/request.interface";

import { BrokerSegmenter } from "../../services/v1/brokersegmenter.service";

@JsonController("/v1/uploadfiles")
class UploadFilesController {
  @Post("/segmenter")
  segmenterUpload(@UploadedFile("fileName") file: Express.Multer.File) {
    console.log("receive process: ", new Date());
    console.log(file);
    const brokerSegmenter = new BrokerSegmenter(file);

    if (brokerSegmenter.saveInDisk()) {
      return brokerSegmenter.startEncode();
    }

    return false;
  }
}

export default UploadFilesController;

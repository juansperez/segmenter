import {
  Controller,
  Get,
  Req,
  Res,
  Param,
  JsonController,
  Post,
  UploadedFile,
  Delete,
} from "routing-controllers";
import { Response } from "express";
import { IRequest } from "../../interfaces/request.interface";
// import VideoSegmenter from "../../models/video-segmenter.model";
import { SegmenterServices } from '../../services/v1/segmenters.service'

@JsonController("/v1/segmenters")
class SegementersController {

  constructor(
    private segmentersServices: SegmenterServices = new SegmenterServices()
  ){

  }

  @Get("/")
  async segmenterList(@Res() response: any) {
    const segmentersList = await this.segmentersServices.getSegmenters();
    return segmentersList;
  }

  /*
  @Delete("/")
  async segmenterDelete() {
    await VideoSegmenter.deleteMany({});
    return { message: "Delete all values" };
  }
  /* */
}

export default SegementersController;

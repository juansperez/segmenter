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
import VideoSegmenter from "../../models/video-segmenter.model";

@JsonController("/v1/segmenters")
class SegementersController {
  @Get("/")
  async segmenterList(@Res() response: any) {
    const segmentersList = await VideoSegmenter.find({});
    return response.send(segmentersList);
  }

  @Delete("/")
  async segmenterDelete() {
    await VideoSegmenter.deleteMany({});
    return { message: "Delete all values" };
  }
}

export default SegementersController;

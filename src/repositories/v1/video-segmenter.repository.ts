import {EntityRepository, Repository, MongoRepository, getRepository} from "typeorm";

/*Interfaces */
import {IVideoSegmenter} from '../../interfaces/video-segmenter.interface'
import {IVideoSegmenterArguments} from '../../interfaces/video-segmenter-argements.interface'
/*Entities */
import {VideoSegmenter} from '../../models/v1/videos.segmenter.model'
import {VideoSegmenterArgument} from '../../models/v1/video.segmenter.arguments'
import logger from "../../utils/logger/logger.util";

@EntityRepository(VideoSegmenter)
export class VideoSegmenterRepository extends Repository<VideoSegmenter>{

  async createVideo(inputData: VideoSegmenter ): Promise<any>{
    if( inputData.id ){
      logger.info('inputData', inputData)
      logger.info(inputData)
      return await this.update(inputData.id, inputData)
    }else{
      logger.info('inputData Create', inputData)
      logger.info(inputData)
      return await this.save( inputData );
    }
  }

  async getVideos(): Promise<any> {
    const segmentersList = await this.find();
    return segmentersList;
  }

  async deleteVideos(): Promise<any> {
    const destroy = await this.delete({})
    return destroy;
  }

}


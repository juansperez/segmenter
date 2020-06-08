import {EntityRepository, Repository, MongoRepository} from "typeorm";

/*Interfaces */
import {IVideoSegmenter} from '../../interfaces/video-segmenter.interface'
import {IVideoSegmenterArguments} from '../../interfaces/video-segmenter-argements.interface'
/*Entities */
import {VideoSegmenter} from '../../models/videos.segmenter.model'
import {VideoSegmenterArgument} from '../../models/v1/video.segmenter.arguments'

@EntityRepository(VideoSegmenter)
export class VideoSegmenterRepository extends MongoRepository<VideoSegmenter>  {


  async saveVideo(inputData: VideoSegmenter ): Promise<any>{
    const video = await this.save( inputData );
    return video;
  }

  async getVideos(): Promise<any> {
    console.log('=================')
    console.log( this   )
    const segmentersList = await this.find();
    // const segmentersList = await this.findAndCount();
    return segmentersList;
  }
}


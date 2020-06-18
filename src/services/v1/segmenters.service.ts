import {VideoSegmenterRepository} from '../../repositories/v1/video-segmenter.repository'
import {VideoSegmenter} from '../../models/v1/videos.segmenter.model'
import {getCustomRepository} from 'typeorm'

export class SegmenterServices {

  constructor(
    private videoSegmenter = getCustomRepository(VideoSegmenterRepository)
  ){}

  public async getSegmenters(){
    const videos = await  this.videoSegmenter.getVideos();
    return videos;
  }

  public async deleteSegmenters(){
    this.videoSegmenter.deleteVideos();
  }
}



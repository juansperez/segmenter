import {VideoSegmenterRepository} from '../../repositories/v1/video-segmenter.repository'

export class SegmenterServices {

  constructor(
    private videoSegmenter:VideoSegmenterRepository = new VideoSegmenterRepository()
  ){

  }

  public async getSegmenters(){
    const videos = await this.videoSegmenter.getVideos();
    return videos;
  }

}
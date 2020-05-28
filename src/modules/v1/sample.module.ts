import Api from "../../core/api.core";
import { Req, Res } from "routing-controllers";

class SampleModule extends Api {
  health(@Req() req: Request, @Res() res: Response) {}
}

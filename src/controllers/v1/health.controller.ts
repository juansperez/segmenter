import { Controller, Get, Req, Res, Param } from "routing-controllers";
import { Response } from "express";
import { IRequest } from "../../interfaces/request.interface";

@Controller("/v1/health")
class HealthController {
  /**
   * @swagger
   * /health:
   *   get:
   *     tags:
   *       - Health
   *     description: Gets health API
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Server is up
   */
  @Get("/")
  async health(@Req() req: IRequest, @Res() res: Response) {
    return res.json({
      message: req.i18n.t("translation:messages.server.success"),
    });
  }

  /**
   * @swagger
   * /health/{id}:
   *   get:
   *     tags:
   *       - Health
   *     description: Gets health API
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Health's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Server is up {id}
   */
  @Get("/:id")
  findById(
    @Param("id") id: number,
    @Req() req: IRequest,
    @Res() res: Response
  ) {
    return res.json({
      message: `${req.i18n.t("translation:messages.server.talenta", {
        value: id,
      })}`,
    });
  }
}

export default HealthController;

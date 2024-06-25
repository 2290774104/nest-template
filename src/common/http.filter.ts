import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { EnumErrorCode } from '../error/error.code';
import { XAPIException } from './api.exception';

@Catch()
export class XHttpFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const message = exception.message;

    Logger.error(
      `请求发生异常 ${request.method} ${request.path} ${message} from ${request.ip}`,
    );

    let code = EnumErrorCode.FAIL;
    let status = HttpStatus.OK;

    if (exception instanceof XAPIException) {
      code = (exception as XAPIException).errorCode;
    } else if (exception instanceof HttpException) {
      status = (exception as HttpException).getStatus();
    } else {
      HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      code: code,
      msg: message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

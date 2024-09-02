import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// 实现http异常捕获的自定义编写
// 实现全局管道验证接口接受参数，抛出错误，自定义返回结构，提示错误信息
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    response.status(200).json({
      code: status,
      msg: exceptionResponse?.message
        ? Array.isArray(exceptionResponse?.message)
          ? exceptionResponse?.message[0]
          : exceptionResponse?.message
        : `Service Error:${response.message}`,
      data: null,
    });
  }
}

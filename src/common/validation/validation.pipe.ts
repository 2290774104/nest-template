import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
  ValidationError,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { XAPIException } from '../api.exception';
import { EnumErrorCode } from '../../error/error.code';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;
    console.log(`value:`, value, 'metatype: ', metatype);
    // 如果没有传入验证规则，则不验证直接返回数据
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    const errorList: string[] = [];
    const errObjList: ValidationError[] = [...errors];

    do {
      const e = errObjList.shift();
      if (!e) {
        break;
      }
      if (e.constraints) {
        for (const item in e.constraints) {
          errorList.push(e.constraints[item]);
        }
      }
      if (e.children) {
        errObjList.push(...e.children);
      }
    } while (true);

    if (errorList.length > 0) {
      const msg = errorList.join();
      Logger.error(`请求参数校验错误: ${msg}`);
      throw new XAPIException(
        EnumErrorCode.QUERY_PARAM_INVALID_FAIL,
        `请求参数校验错误: ${msg}`,
      );
    }
    return object;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

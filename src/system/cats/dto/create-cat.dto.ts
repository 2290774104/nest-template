import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty({ message: 'name不能为空' })
  @IsString({ message: 'name必须是String类型' })
  readonly name: string;
  @IsNotEmpty({ message: 'age不能为空' })
  readonly age: string;
  @IsNotEmpty({ message: 'breed不能为空' })
  readonly breed: string;
}

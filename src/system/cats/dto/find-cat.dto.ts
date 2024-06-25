import { IsNotEmpty, IsString } from 'class-validator';
export class FindCatDto {
  @IsNotEmpty({ message: 'name不能为空' })
  @IsString({ message: 'name必须是String类型' })
  readonly name: string;
}

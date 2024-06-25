import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CatsServics } from './cats.service';
import { FindCatDto } from './dto/find-cat.dto';
import { CreateCatDto } from './dto/create-cat.dto';
import { ResultData } from '../../common/utils/result';
import { ForbiddenException } from './forbidden.exception';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsServics) {}

  @Post('createCat')
  async create(@Body() createCatDto: CreateCatDto): Promise<ResultData> {
    this.catsService.create(createCatDto);
    return ResultData.ok();
  }

  @Get('findAll')
  async findAll(): Promise<ResultData> {
    return ResultData.ok(this.catsService.findAll());
  }

  @Get('findCat')
  async findCat(@Query() findCatDto: FindCatDto): Promise<ResultData> {
    return ResultData.ok(this.catsService.findCat(findCatDto.name));
  }

  @Get('forbidden')
  async forbidden() {
    throw new ForbiddenException();
  }
}

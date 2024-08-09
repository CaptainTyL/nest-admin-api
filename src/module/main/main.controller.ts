import { Controller } from '@nestjs/common';
import { MainService } from './main.service';

// 根目录
@Controller('/')
export class MainController {
  constructor(private readonly mainService: MainService) {}
}

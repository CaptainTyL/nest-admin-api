import { Controller, HttpCode, Post, Body, Request, Get } from '@nestjs/common';
import { MainService } from './main.service';
import { LoginDto, RegisterDto } from './dto/index';
import * as UserAgent from 'useragent';
import { createMath } from 'src/common/utils/captcha';
import { GenerateUUID } from 'src/common/utils';
import { RedisService } from '../redis/redis.service';
import { CacheEnum } from 'src/common/enum';
import { ResultData } from 'src/common/utils/result';

// 根目录
@Controller('/')
export class MainController {
  constructor(
    private readonly mainService: MainService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 用户登录
   */
  @Post('/login')
  @HttpCode(200)
  login(@Body() user: LoginDto, @Request() req) {
    const agent = UserAgent.parse(req.headers['user-agent']);
    const os = agent.os.toJSON().family;
    const browser = agent.toAgent();
    const clientInfo = {
      userAgent: req.headers['user-agent'],
      ipaddr: req.ip,
      browser,
      os,
      loginLocation: '',
    };
    // TODO：处理登录日志数据记录
    return this.mainService.login(user, clientInfo);
  }

  /**
   * 用户注册
   *
   */
  @Post('/register')
  @HttpCode(200)
  register(@Body() user: RegisterDto) {
    return this.mainService.register(user);
  }

  /**
   * 获取验证码图片
   */
  @Get('/captchaImage')
  async captchaImage() {
    // TODO:系统内置参数设置 判断是否开启验证码校验
    const data = {
      captchaEnabled: true,
      img: '',
      uuid: '',
    };
    try {
      const captchaInfo = createMath();
      data.img = captchaInfo.data;
      data.uuid = GenerateUUID();
      // 将验证码信息存入redis缓存，设置缓存失效时间 5分钟
      await this.redisService.set(
        CacheEnum.CAPTCHA_CODE_KEY + data.uuid,
        captchaInfo.text.toLowerCase(),
        1000 * 60 * 5,
      );
      return ResultData.ok(data, '操作成功');
    } catch (error) {
      return ResultData.fail(500, '生成验证码错误，请重试');
    }
  }
  /**
   * 退出登录-只是记录登录日志 不做其他操作
   */
  // @Post('/logout')
  // @HttpCode(200)
  // logout(@Request() req) {

  // }
}

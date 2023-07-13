import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('app', 'https://rxresu.me'),
      () => this.http.pingCheck('blog', 'https://blog.rxresu.me'),
      () => this.http.pingCheck('docs', 'https://docs.rxresu.me'),
      () => this.db.pingCheck('database'),
    ]);
  }
}

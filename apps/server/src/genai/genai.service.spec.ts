import { Test, TestingModule } from '@nestjs/testing';

import { GenaiService } from './genai.service';

describe('OpenaiService', () => {
  let service: GenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenaiService],
    }).compile();

    service = module.get<GenaiService>(GenaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

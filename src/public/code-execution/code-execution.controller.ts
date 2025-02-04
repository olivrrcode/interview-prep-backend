import { Controller, Post, Body } from '@nestjs/common';
import { CodeExecutionService } from './code-execution.service';

@Controller('execute')
export class CodeExecutionController {
  constructor(private readonly codeService: CodeExecutionService) {}

  @Post()
  async execute(
    @Body() body: { code: string; language: 'javascript' | 'python' | 'cpp' },
  ) {
    const output = await this.codeService.runCode(body.code, body.language);
    return { output };
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { CodeExecutionService } from './code-execution.service';
import { ExecuteCodeDto } from './dto/code-execution.dto';

@Controller('execute')
export class CodeExecutionController {
  constructor(private readonly codeExecutionService: CodeExecutionService) {}

  @Post()
  async executeCode(@Body() executeCodeDto: ExecuteCodeDto) {
    return this.codeExecutionService.runCode(executeCodeDto);
  }
}

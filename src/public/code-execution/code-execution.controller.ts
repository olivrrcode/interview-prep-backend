import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CodeExecutionService } from './code-execution.service';
import { ExecuteCodeDto } from './dto/code-execution.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('code-execution')
@Controller('execute')
export class CodeExecutionController {
  constructor(private readonly codeExecutionService: CodeExecutionService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Execute code in specified language' })
  @ApiResponse({ status: 200, description: 'Code executed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async executeCode(@Body() executeCodeDto: ExecuteCodeDto) {
    return this.codeExecutionService.runCode(executeCodeDto);
  }
}

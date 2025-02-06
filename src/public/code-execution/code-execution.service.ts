import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ExecuteCodeDto } from './dto/code-execution.dto';
import { exec } from 'child_process';
import { promisify } from 'util';

const asyncExec = promisify(exec);

@Injectable()
export class CodeExecutionService {
  async runCode({
    code,
    language,
  }: ExecuteCodeDto): Promise<{ output: string; error?: string }> {
    try {
      if (!code) {
        throw new HttpException('Code cannot be empty', HttpStatus.BAD_REQUEST);
      }

      // Validate language-specific image exists
      try {
        await asyncExec(`docker image inspect code-runner-${language}`);
      } catch (error) {
        console.error(`Image check failed: ${error.message}`);
        throw new HttpException(
          `Language runtime not available: ${language}`,
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      // Escape code to prevent command injection
      const escapedCode = code.replace(/"/g, '\\"').replace(/\$/g, '\\$');

      const { stdout, stderr } = await asyncExec(
        `echo "${escapedCode}" | docker run --rm -i code-runner-${language}`,
        {
          timeout: 10000,
          maxBuffer: 1024 * 1024,
        },
      );

      return {
        output: stdout,
        error: stderr || undefined,
      };
    } catch (error) {
      console.error(`Code execution failed: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Code execution failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

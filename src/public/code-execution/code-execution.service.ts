import { Injectable } from '@nestjs/common';
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
      const { stdout, stderr } = await asyncExec(
        `echo "${code}" | docker run --rm -i code-runner-${language}`,
      );
      return { output: stdout, error: stderr || undefined };
    } catch (error) {
      return { output: '', error: error.message };
    }
  }
}

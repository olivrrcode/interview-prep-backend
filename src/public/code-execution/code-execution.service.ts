import { Injectable } from '@nestjs/common';
import * as Docker from 'dockerode';

@Injectable()
export class CodeExecutionService {
  private docker = new Docker();

  async runCode(
    code: string,
    language: 'javascript' | 'python' | 'cpp',
  ): Promise<string> {
    const imageMap = {
      javascript: 'node:20-alpine',
      python: 'python:3.11-alpine',
      cpp: 'gcc:latest',
    };

    const image = imageMap[language];
    if (!image) throw new Error('Unsupported language');

    const container = await this.docker.createContainer({
      Image: image,
      Cmd: this.getCommand(language, code),
      Tty: false,
    });

    await container.start();
    const logs = await container.logs({ stdout: true, stderr: true });
    await container.remove();

    return logs.toString();
  }

  private getCommand(language: string, code: string): string[] {
    switch (language) {
      case 'javascript':
        return ['node', '-e', code];
      case 'python':
        return ['python', '-c', code];
      case 'cpp':
        return [
          'sh',
          '-c',
          `echo "${code}" | g++ -o /tmp/a.out - && /tmp/a.out`,
        ];
      default:
        return [];
    }
  }
}

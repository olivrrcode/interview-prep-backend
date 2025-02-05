import { IsString, IsIn } from 'class-validator';

export class ExecuteCodeDto {
  @IsString()
  code: string;

  @IsString()
  @IsIn(['javascript', 'python', 'java']) // Extend as needed
  language: string;
}

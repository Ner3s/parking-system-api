import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'email@mail.com',
  })
  email: string;

  @ApiProperty({
    example: 'usuário',
  })
  name: string;

  @ApiProperty({
    example: 'AbcD@1234.',
  })
  password: string;

  @ApiProperty({
    example: 'AbcD@1234.',
  })
  passwordConfirmation: string;
}

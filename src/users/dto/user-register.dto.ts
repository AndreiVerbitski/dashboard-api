import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверный email' })
	'email': string;

	@IsString({ message: 'Не указан name' })
	'name': string;

	@IsString({ message: 'Не указан пароль' })
	'password': string;
}

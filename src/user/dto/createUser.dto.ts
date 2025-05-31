import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	password_hash!: string;

	@IsNotEmpty()
	username!: string;
}

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    public name!: string;

    @IsEmail()
    public email!: string;

    @IsString()
    @MinLength(6)
    public password!: string;
}

export class VerifyOtpDto {
    @IsEmail()
    public email!: string;

    @IsString()
    @IsNotEmpty()
    public otp!: string;
}

export class ResendOtpDto {
    @IsEmail()
    public email!: string;
}

export class LoginDto {
    @IsEmail()
    public email!: string;

    @IsString()
    @IsNotEmpty()
    public password!: string;
}

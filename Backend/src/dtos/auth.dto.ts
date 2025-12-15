import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    public name!: string;

    @IsEmail()
    @IsNotEmpty()
    public email!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    public password!: string;

    @IsString()
    @IsOptional()
    public phoneNumber?: string;

    @IsString()
    @IsOptional()
    public germanLevel?: string;
}

export class GoogleLoginDto {
    @IsString()
    @IsNotEmpty()
    public token!: string;
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

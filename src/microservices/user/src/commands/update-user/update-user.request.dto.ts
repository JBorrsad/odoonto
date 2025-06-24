import { ApiProperty } from '@nestjs/swagger';
import {
    IsAlphanumeric,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    IsOptional,
} from 'class-validator';

export class UpdateUserRequestDto {
    @ApiProperty({
        example: 'Spain',
        description: 'Country of residence',
        required: false
    })
    @IsOptional()
    @MaxLength(50)
    @MinLength(4)
    @IsString()
    @Matches(/^[a-zA-Z ]*$/)
    readonly country?: string;

    @ApiProperty({
        example: '28001',
        description: 'Postal code',
        required: false
    })
    @IsOptional()
    @MaxLength(10)
    @MinLength(4)
    @IsAlphanumeric()
    readonly postalCode?: string;

    @ApiProperty({
        example: 'Main Street',
        description: 'Street',
        required: false
    })
    @IsOptional()
    @MaxLength(50)
    @MinLength(5)
    @Matches(/^[a-zA-Z ]*$/)
    readonly street?: string;
} 
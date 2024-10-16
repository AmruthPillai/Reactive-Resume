import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationQueryDto {
  @ApiProperty({
    description: "page number",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    description: "page size",
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  @ApiProperty({
    description: "search name/email",
    example: "abc@gmail.com",
    required: false,
  })
  @IsOptional()
  search?: string;
}

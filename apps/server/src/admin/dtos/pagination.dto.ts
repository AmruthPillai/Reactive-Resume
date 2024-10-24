import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsPositive, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

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
  search?: string = "";
}

export class paginationQueryResumeDto extends PaginationQueryDto {
  @ApiProperty({
    description: "search open to work (true/false)",
    example: true,
    required: false,
  })
  @IsOptional()
  @Transform((val) => {
    return val.obj?.openToWork === "true";
  })
  @IsBoolean()
  openToWork?: boolean;

  @ApiProperty({
    description: "user identify (email/id)",
    example: "abc@gmail.com",
    required: false,
  })
  @IsOptional()
  userIdentify?: string = "";
}

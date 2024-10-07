import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { Entities } from "../enums/Entities.enum";
import { PaginationDto } from "@reactive-resume/dto";
import { PaginationInterface } from "./interfaces/pagination.interfaces";

@Injectable()
export class PaginationService {
  /**
   * contructor
   */
  constructor(
    /**
     * inject prismaService
     */
    private readonly prisma: PrismaService,
  ) {}

  /**
   * paginated method
   */
  public async paginatedQuery(
    paginationDto: PaginationDto,
    entity: Entities,
    where: object = {},
    select: object = {},
  ): Promise<PaginationInterface> {
    try {
      try {
        // total item
        const totalRecord: number = await (this.prisma[entity] as any).count({
          where: where,
        });

        // there is no record
        if (totalRecord === 0) {
          return {
            data: [],
            meta: {
              currentPage: paginationDto.page,
              itemPerPage: paginationDto.pageSize,
              totalItem: 0,
              totalPage: 0,
            },
          } as PaginationInterface;
        }

        //   total page
        const totalPage: number = Math.ceil(totalRecord / paginationDto.pageSize);

        // if request page greater than total page
        paginationDto.page = paginationDto.page > totalPage ? totalPage : paginationDto.page;

        // data
        const data: any = await (this.prisma[entity] as any).findMany({
          skip: (paginationDto.page - 1) * paginationDto.pageSize,
          take: paginationDto.pageSize,
          where: where,
          select: select,
        });

        const result: PaginationInterface = {
          data: data,
          meta: {
            currentPage: paginationDto.page,
            itemPerPage: paginationDto.pageSize,
            totalItem: totalRecord,
            totalPage: totalPage,
          },
        };

        return result;
      } catch (error) {
        throw new BadRequestException(error);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}

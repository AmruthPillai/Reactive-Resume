import { SetMetadata } from "@nestjs/common";
import { Roles } from "../enums/roles.enum";
import { ROLE_KEY } from "../constants/admin.constant";

/**
 * admin decorator
 */

export const Role = (role: Roles[]) => SetMetadata(ROLE_KEY, role);

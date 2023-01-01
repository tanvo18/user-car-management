import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../../enums/role';
import { RolesGuard } from '../../guards/roles.guard';

export const ROLES_KEY = 'roles';
export function Roles(roles: Role[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<Role>('role', context.getHandler());
    if (!requiredRole) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { role?: Role } }>();
    const userRole: Role | undefined = request?.user?.role;
    if (!userRole) return false;

    return userRole === requiredRole;
  }
}

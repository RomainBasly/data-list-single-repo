import { container } from 'tsyringe';
import { AppUserController } from '../../api/app-users/controllers';
import { AppAuthController } from '../../api/app-auth/controller';
import { AppRefreshTokenController } from '../../api/app-refresh-token/controller';
import { AppEmailVerificationController } from '../../api/app-email-verification/controller';
import { ListManagementController } from '../../api/app-list-management/controller';
import { WebSocketClientService } from '../../domain/webSockets/services';

export function initContainers() {
  container.register(AppUserController, AppUserController);
  container.register(AppAuthController, AppAuthController);
  container.register(AppRefreshTokenController, AppRefreshTokenController);
  container.register(AppEmailVerificationController, AppEmailVerificationController);
  container.register(ListManagementController, ListManagementController);
  container.registerSingleton(WebSocketClientService, WebSocketClientService);
}

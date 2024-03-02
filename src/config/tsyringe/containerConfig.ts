import { container } from 'tsyringe';
import { AppUserController } from '../../api/app-users/controllers';
import { AppAuthController } from '../../api/app-auth/controller';
import { AppRefreshTokenController } from '../../api/app-refresh-token/controller';
import { AppEmailVerificationController } from '../../api/app-email-verification/controller';
import { AppCreateListController } from '../../api/app-create-list/controller';

export function initContainers() {
  container.register(AppUserController, AppUserController);
  container.register(AppAuthController, AppAuthController);
  container.register(AppRefreshTokenController, AppRefreshTokenController);
  container.register(AppEmailVerificationController, AppEmailVerificationController);
  container.register(AppCreateListController, AppCreateListController);
}

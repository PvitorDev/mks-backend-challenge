import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException(
        this.i18n.t('errors.USER_UNAUTHORIZED', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return user;
  }
}

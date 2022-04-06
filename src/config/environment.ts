import { config } from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

class Environment {
  constructor() {
    config();
  }

  get app(): string {
    return process.env.APP.toUpperCase();
  }

  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  get port(): number {
    return parseInt(process.env.PORT || '80', 10);
  }

  get apiConfig(): {
    version: string;
    prefix: string;
  } {
    return {
      version: process.env.API_VERSION,
      prefix: process.env.API_PREFIX,
    };
  }

  get transactionConfig(): {
    expiration: number;
  } {
    return {
      expiration: parseInt(process.env.TRANSACTION_EXPIRATION || '900', 10),
    };
  }

  get passwordsRotationConfig() {
    return {
      keepOldCount: parseInt(
        process.env.PASSWORDS_ROTATION_KEEP_OLD_COUNT || '4',
        10,
      ),
      passwordLifetime: parseInt(
        // Password lifetime specified in days
        process.env.PASSWORDS_ROTATION_PASSWORD_LIFETIME || '90',
        10,
      ),
    };
  }

  get urlsConfig(): {
    api: {
      current: string;
      client: string;
      dashboard: string;
      partner: string;
    };
    web: {
      client: string;
      dashboard: string;
      admin: string;
      cc: string;
    };
  } {
    return {
      api: {
        current: process.env.CURRENT_API_HOST,
        client: process.env.CLIENT_API_HOST,
        dashboard: process.env.DASHBOARD_API_HOST,
        partner: process.env.PARTNER_API_HOST,
      },
      web: {
        client: process.env.CLIENT_WEB_HOST,
        dashboard: process.env.DASHBOARD_WEB_HOST,
        admin: process.env.ADMIN_WEB_HOST,
        cc: process.env.CC_WEB_HOST,
      },
    };
  }

  get surveyHosts() {
    return {
      api: process.env.SURVEY_API_HOST,
      web: process.env.SURVEY_WEB_HOST,
    };
  }

  get corsConfig(): { origin: CorsOptions['origin']; credentials: boolean } {
    const type = process.env.CORS_TYPE || 'string';
    let origin: CorsOptions['origin'];

    switch (type) {
      case 'array':
        origin = process.env.CORS_ORIGIN.split(',').map((v) =>
          v.startsWith('/') && v.endsWith('/') ? new RegExp(v.slice(1, -1)) : v,
        );
        break;
      case 'regexp':
        origin = new RegExp(process.env.CORS_ORIGIN);
        break;
      case 'string':
      default:
        origin = process.env.CORS_ORIGIN;
        break;
    }

    return {
      origin,
      credentials: process.env.CORS_CREDENTIALS !== 'false',
    };
  }

  get cookiesConfig(): {
    domain: string;
  } {
    return {
      domain: process.env.COOKIE_DOMAIN,
    };
  }

  get emailsConfig() {
    return {
      strategy: (process.env.EMAILS_SERVICE_TYPE || 'local') as
        | 'local'
        | 'external',
    };
  }

  get slackConfig() {
    return {
      withdrawals: process.env.SLACK_WITHDRAWALS_NOTIFICATIONS_LINK,
    };
  }

  get chromeConfig() {
    return {
      executablePath: process.env.CHROME_EXECUTABLE_PATH,
    };
  }
}

export const environment = new Environment();

import _                  from 'lodash';

import Context            from 'model/context.model';
import DataSource         from '@/datasource';
import LoginHistory       from 'entity/login-history.entity';
import { LoggerFactory }  from '@/logger';

class LoginHistoryService {

  static logger = LoggerFactory('login-history.service')

  static recordAuth = async (context: Context, email: string, success: boolean) => {
    const loginHistory = new LoginHistory(email, context.ipAddress, success);
    return await DataSource.getRepository(LoginHistory).save(loginHistory);
  }

}
export default LoginHistoryService;

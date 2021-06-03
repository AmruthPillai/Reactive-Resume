import AuthProvider from './authProvider';
import Constants from '../constants/auth';

class GoogleAuthProvider extends AuthProvider {
  constructor() {
    super(Constants.googleAuthProviderId);
  }
}

export default GoogleAuthProvider;

import { Request, Response, NextFunction } from 'express';
import { isValidPassword, isNull } from "../../../utils/helpers.util";
import { success, created, notFound, validationFailed, conflict } from "../../responses";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import EmailActivationAction from '../../actions/auth/email-activation.action';
import constants from '../../../utils/constants.util';

var userService: UserService = new UserService();
var authService: AuthService = new AuthService();

/**
   * User Registration
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const register = async (req: Request | any, res: Response, next: NextFunction): Promise<Response | any> => {
    const validPassword: boolean | undefined = isValidPassword(req.body.password);

    if (!validPassword) {
        return validationFailed(res, constants.messages.invalidPasswordError);
    }

    const response = await authService.register(req, res, next);

    return created(res, constants.messages.accountCreated, response);

}

/**
   * User verifies email
   * 
     @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise <Response|any>}
*/
const verifyAccount = async (req: Request | any, res: Response, next: NextFunction): Promise<Response | any> => {

    const user = await userService.findUserById(req.params.user_id);

    if (isNull(user)) {
        return notFound(res, constants.messages.notFound);
    }

    const isVerified: Promise<boolean> = authService.verifyAccount(req, res, next, user);

    if (!isVerified) {
        return conflict(res, constants.messages.somethingWentWrong);

    }

    return success(res, constants.messages.accountActivated);

}

/**
   * User Login
   * 
     @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise <Response|any>}
*/
const login = async (req: Request | any, res: Response, next: NextFunction): Promise<Response | any> => {

    const response = await authService.login(req, res, next);

    return success(res, constants.messages.loginSuccess, response);
}

/**
   * User Get Activation Email
   * 
     @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise<Response|any>}
*/
const getActivationEmail = async (req: Request | any, res: Response, next: NextFunction): Promise<Response | any> => {

    const user_id: any = req.session.user._id;

    const user = await userService.findUserById(user_id);

    if (isNull(user)) {
        return notFound(res, constants.messages.notFound);
    }

    await userService.deleteUserMultiple({ email: user.email });

    const response = EmailActivationAction.execute(req, res, next, user);

    return success(res, constants.messages.activationEmailSent, response)
}

/**
  * User Logout
  * 
  * @param {Request} req
  * @param {Response} res
  * 
  * @returns {Promise <Response|any>}
*/
const logout = async (req: Request | any, res: Response): Promise<Response | any> => {

    req.session = null;

    return success(res, constants.messages.logoutSuccess);
}

const authProtected = async (req: Request | any, res: Response): Promise<Response | any> => {

    return success(res, 'Protected route accessed Successfully', req.session.user);
}


export default {
    register,
    verifyAccount,
    getActivationEmail,
    login,
    logout,
    authProtected
}
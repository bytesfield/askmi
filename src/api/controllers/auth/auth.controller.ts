import { Request, Response, NextFunction } from 'express';
import { isValidPassword, isNull } from "../../../utils/helpers.util";
import { success, created, notFound, validationFailed, conflict } from "../../responses";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import EmailActivationAction from '../../actions/auth/email-activation.action';

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

    //Validate Password
    const validPassword: boolean | undefined = isValidPassword(req.body.password);

    if (!validPassword) {
        return validationFailed(res, 'Password must be at least 6 characters, a lowercase and uppercase letter, a numeric and special character.');
    }

    const response = await authService.register(req, res, next);

    return created(res, 'Registration Successful, Check Email for Activation Link', response);

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
        return notFound(res, 'User not found');
    }

    const isVerified: Promise<boolean> = authService.verifyAccount(req, res, next, user);

    if (!isVerified) {
        return conflict(res, 'Something went wrong');

    }

    return success(res, 'Account Activated Successfully');

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

    return success(res, 'Logged in Successfully', response);
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
        return notFound(res, 'User not found');
    }

    await userService.deleteUserMultiple({ email: user.email });

    const response = EmailActivationAction.execute(req, res, next, user);

    return success(res, 'Check Email for Account Activation Link', response)
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

    return success(res, 'Logout Successfully');
}


export default {
    register,
    verifyAccount,
    getActivationEmail,
    login,
    logout
}
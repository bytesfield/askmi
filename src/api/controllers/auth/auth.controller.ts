import { Request, Response, NextFunction } from 'express';
import { isValidPassword } from "../../../utils/helpers.util";
import { success, notFound, validationFailed } from "../../responses";
import RegisterAction from "../../actions/auth/register.action";

/**
   * User Registration
   * 
   * @param {Request} req
   * @param {Response} res
   * 
   * @returns {Promise|Response/any} 
*/
const register = async (req: Request | any, res: Response, next: NextFunction): Promise<Response | any> => {

    //Validate Password
    const validPassword: boolean | undefined = isValidPassword(req.body.password);

    if (!validPassword) {
        return validationFailed(res, 'Password must be at least 6 characters, a lowercase and uppercase letter, a numeric and special character.');
    }

    const registerAction: Promise<Response | any> = RegisterAction.execute(req, res, next);

    return registerAction;
}


export default {
    register
}
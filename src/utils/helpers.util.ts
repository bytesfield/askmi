import bcrypt from 'bcrypt';
import config from '../config';

const saltRounds: number = config.service.saltRounds;

export const hash = async (value: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(value, salt);
}

export const compare = async (value: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(value, hash);
};

export const isEmptyObject = (obj: {}): boolean => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const isValidPassword = (password: string): boolean | undefined => {
    const isValidPassword = password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/
    )

    if (isValidPassword) {
        return true;
    }
}

export const addMinutes = (mins: number): Date => {
    return new Date(new Date().getTime() + mins * 60000);
}
export interface UserInterface {
    createUser(item: object): Promise<any>
    updateUser(is: number, item: object): Promise<any>
    findUserByEmail(email: string): Promise<string>;
    findUserByMultiple(obj: object): Promise<string>;
    deleteUser(id: number): Promise<boolean>;

}
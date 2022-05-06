import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export async function createUser(
    // this function creates a timestamp which we are going to omit, because mongoDB generates that already.
    input: DocumentDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>
) {
    try {
        return await UserModel.create(input);
    } catch (e: any) {
        throw new Error(e);
    }
}
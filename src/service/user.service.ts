import { DocumentDefinition, FilterQuery } from 'mongoose';
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


export async function validatePassword({
    email,
    password,
}: {
        email: string;
        password: string;
    }) {
    const user = await UserModel.findOne({ email });

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean()
}

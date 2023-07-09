import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export async function hashIt(password: string) {
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
}

export async function hasSamePasswords(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}


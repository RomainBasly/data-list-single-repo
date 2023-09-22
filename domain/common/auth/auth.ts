import bcrypt from 'bcrypt';

export async function hashedPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export default hashedPassword;
import bcrypt from 'bcrypt';

const hashedPassword = async (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    console.log({salt})
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log({hashedPassword})
    return hashedPassword;
}

export default hashedPassword;
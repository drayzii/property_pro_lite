import bcrypt from 'bcrypt';

class bcryptHash {
  static async encryptPassword(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      return false;
    }
  }
  static async checkPassword(password1, password2) {
    try {
      const truePassword = await bcrypt.compare(password1, password2);
      return truePassword;
    } catch (error) {
      return false;
    }
  }
}

export default bcryptHash;

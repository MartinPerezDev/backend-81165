import crypto from "crypto";

const secretKey = "miclavesecreta";

class UsersManager{
  static users = [];

  static hashPassword(password){
    const hashedPassword = crypto.createHmac("sha256", secretKey).update(password).digest("hex");
    return hashedPassword;
  }

  static createUser(user){
    const hashedPassword = this.hashPassword(user.password);
    const newUser = { ...user, password: hashedPassword };
    this.users.push(newUser);

    console.log("Usuario creado correctamente");
  }

  static showUsers(){
    console.table(this.users);
  }

  static login(username, password){
    const userFind = this.users.find((user)=> user.username === username );
    if(!userFind) return console.error("Usuario no encontrado");

    const hashedPassword = this.hashPassword(password);
    if(userFind.password !== hashedPassword) return console.error("Error, contraseña incorrecta");

    console.log("Usuario logueado correctamente!");
  }
}

UsersManager.createUser({ username: "MartinDev", password: "contraseña123" });
UsersManager.createUser({ username: "LautaroDev", password: "estanoesmicontraseña" });

UsersManager.showUsers();

UsersManager.login("PaolaDev", "contraseña12");
UsersManager.login("MartinDev", "contraseña321");
UsersManager.login("LautaroDev", "estanoesmicontraseña");
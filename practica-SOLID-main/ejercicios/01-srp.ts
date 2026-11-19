interface User {
  username: string;
  email: string;
}

// class UserManager {
//   users: User[] = [];

//   register(username: string, email: string): string {
//     if (!email.includes("@")) {
//       throw new Error("El correo no es valido");
//     }

//     this.users.push({ username, email });
//     return this.sendWelcomeEmail(email);
//   }

//   private sendWelcomeEmail(email: string): string {
//     return `Email enviado a ${email}`;
//   }
// }


// Distribuyo las responsabilidades entre estas clases:
// UserValidator valida el correo electrónico.
// UserRepository almacena al usuario en una base de datos (aquí, en un arreglo).
// EmailService envía el mensaje de bienvenida al correo indicado.
// UserRegistrationService coordina el uso conjunto de las otras clases.

class UserValidator{
  
  validateEmail(email:string) {
    if (!email.includes("@")) {
      throw new Error("El correo no es válido");
      
    } return email
  }
  
}

class UserRepository { 
  user: User[] = [];

  save({username, email }: User) {
    this.user.push({username, email })
  } 

}

class EmailService {
  sendWelcomeEmail(email: string): string {
    return `Email enviado a ${email}`;
  }
}

class UserRegistrationService {

  // Se declaran las tres dependencias que necesita el servicio.
  validator: UserValidator;
  repository: UserRepository;
  emailService: EmailService;


  constructor() {
    this.validator = new UserValidator();
    this.repository = new UserRepository();
    this.emailService = new EmailService()
  }

  register(username: string, email: string): string{

    this.validator.validateEmail(email)
    this.repository.save({username, email})
    return this.emailService.sendWelcomeEmail(email)
  } 

}

const registroService = new UserRegistrationService();

const usuario = registroService.register("Agos", "agos@gmail.com");
console.log(usuario); 


// - ¿Qué tareas reúne `UserManager`?

// Se ocupa de coordinar el registro, comprobar que el correo incluya @, guardar usuarios en un arreglo y preparar el mensaje de correo.


// - ¿Qué pasaría si cambiara el mecanismo de almacenamiento?

// Habría que modificar esta clase, con el riesgo de afectar la validación del correo o el envío de mensajes, porque todas esas tareas están mezcladas.


// - ¿Qué clase podría asumir el envío de correos?

// EmailService puede encargarse de forma independiente y exclusiva de gestionar los mensajes salientes.
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();

    const requestingUser = this.usersRepository.findById(user_id);

    if (!requestingUser) {
      throw new Error("Usuário requisitante não existe");
    }

    if (!requestingUser.admin) {
      throw new Error("Sem permissão");
    }

    return users;
  }
}

export { ListAllUsersUseCase };

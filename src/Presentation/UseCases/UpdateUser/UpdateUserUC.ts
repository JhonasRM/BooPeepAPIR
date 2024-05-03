import { User } from "../../../Service/Model/User";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";


export class UpdateUserUC {
    constructor(private usersRepository: UsersRepository) { }

    async update(data: IUpdateUserRequestDTO): Promise<{ valido: boolean; value?: number; erro?: string; data?: User }> {
        try {
            const userToUpdate = await this.usersRepository.findByEmail(data.email);
            if (userToUpdate.valido === false) {
              return { valido: false, value: 404, erro: "Not Found" };
            }
                const user = userToUpdate.value 
            if(user?.uid !== undefined){
                const updatedUser =  await this.usersRepository.update(user?.uid, data as User)
                if(updatedUser.valido === false){
                    return { valido: false, value: 400, erro: "Bad Request" };
                }
                return { valido: true, value: 201, data: updatedUser.value as User };
            }
            return { valido: false, value: 404, erro: "Not Found" };
    } catch(error){
        return { valido: false, value: 500, erro: "Internal Server Error" };
    }
}
}
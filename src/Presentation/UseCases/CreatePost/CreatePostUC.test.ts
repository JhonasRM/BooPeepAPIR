import { UserMetadata } from "firebase-admin/lib/auth/user-record";
import { conn } from "../../../Data Access/DAO/conn";
import { Post } from "../../../Service/Model/Post";
import { User } from "../../../Service/Model/User";
import { PostRepository } from "../../../Service/Repositories/PostRepository";
import { UsersRepository } from "../../../Service/Repositories/UsersRepository";

describe('PostRepository', () => {
  let postRepository: PostRepository;
  let usersRepository: UsersRepository;

  beforeAll(() => {
    postRepository = new PostRepository()
    usersRepository = new UsersRepository()
  });

  test('Create Post without user verification should return by console.log the post data', async () => {
    const userData = usersRepository.findByEmail('jonathan@gmail.com')
    if(userData !== null){
        throw new Error('usuário não encontrado')
    }
    const PostData: Post = new  Post({
            'description': 'NewPost',
            'local': 'Etec Zona Leste',
            'status': 0,
            'UserID': '',
        }, userData)
        const NewPost = await postRepository.save(PostData)
    expect(NewPost).not.toBeNull()
  }, 100000);

});
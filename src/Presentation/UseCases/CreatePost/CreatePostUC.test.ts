import { conn } from "../../../Data Access/DAO/conn";
import { Post } from "../../../Service/Model/Post";
import { User } from "../../../Service/Model/User";
import { PostRepository } from "../../../Service/Repositories/PostRepository";
import { UsersRepository as UserRepository } from "../../../Service/Repositories/UsersRepository";

describe('UserRepository', () => {
<<<<<<< HEAD
  let postRepository: PostRepository;

  beforeAll(() => {
=======
  let userRepository: UserRepository;
  let postRepository: PostRepository;

  beforeAll(() => {
    userRepository = new UserRepository()
>>>>>>> 8b747ea58647141a8253a5535760161103253000
    postRepository = new PostRepository()
  });

  test('Create Post without user verification should return by console.log the post data', async () => {
        const PostData: Post = new  Post({
            'description': 'NewPost',
            'local': 'Etec Zona Leste',
            'status': 0,
            // 'UserID': user?.id,
<<<<<<< HEAD
            'createdAt': 0
=======
            'createdAt': Date.now()
>>>>>>> 8b747ea58647141a8253a5535760161103253000
        })
        const NewPost = await postRepository.save(PostData)
    expect(NewPost).not.toBeNull()
  }, 100000);

});
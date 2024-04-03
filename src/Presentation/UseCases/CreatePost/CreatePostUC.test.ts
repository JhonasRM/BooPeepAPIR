import { conn } from "../../../Data Access/DAO/conn";
import { Post } from "../../../Service/Model/Post";
import { User } from "../../../Service/Model/User";
import { PostRepository } from "../../../Service/Repositories/PostRepository";
import { UsersRepository as UserRepository } from "../../../Service/Repositories/UsersRepository";

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let postRepository: PostRepository;

  beforeAll(() => {
    userRepository = new UserRepository()
    postRepository = new PostRepository()
    // conn()
});

  // test('Create Post without user verification should return by console.log the post data', async () => {
  //       const PostData: Post = new  Post({
  //           'description': 'NewPost',
  //           'local': 'Etec Zona Leste',
  //           'status': 0,
  //           // 'UserID': user?.id,
  //           'createdAt': Date.now()
  //       })
  //       const NewPost = await postRepository.save(PostData)
  //   expect(NewPost).not.toBeNull()
  // }, 100000);

  test('Find Non existing Post By ID returning error', async () => {
    const nonExistingID = '1'
    const WantedPost = await postRepository.findByID(nonExistingID)
expect(WantedPost).toBeNull()
}, 100000);
});
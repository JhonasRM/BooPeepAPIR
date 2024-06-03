import { PostRepository } from "../../../../Service/Repositories/PostRepository";

describe('UserRepository function getAllPosts to return a Array List of Posts from Firebase', () => {
    let postRepository: PostRepository

    beforeAll(() => {
        postRepository = new PostRepository()
    });
    test('Find Non existing Post By ID returning error', async () => {
        const nonExistingID = '1'
        const WantedPost = await postRepository.findByID(nonExistingID)
    expect(WantedPost).toBeNull()
    }, 100000);
    test('Find  existing Post By ID returning error', async () => {
      const ExistingID = '2EFlzO3EXQwcfSBbSfSa'
      const WantedPost = await postRepository.findByID(ExistingID)
      expect(WantedPost).toEqual({
        'description': 'NewPost',
              'local': 'Etec Zona Leste',
              'status': 0,
              // 'UserID': user?.id,
              'createdAt': 1712280874172
      })
    }, 100000);
})
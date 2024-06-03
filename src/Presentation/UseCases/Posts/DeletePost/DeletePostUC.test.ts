import { PostRepository } from "../../../../Service/Repositories/PostRepository";


describe('UserRepository function getAllPosts to return a Array List of Posts from Firebase', () => {
    let postRepository: PostRepository

    beforeAll(() => {
        postRepository = new PostRepository()
    });
    test('Deleting Non existing Post By ID returning error', async () => {
        const nonExistingID = '1'
        const WantedPost = await postRepository.deletePost(nonExistingID)
    expect(WantedPost).toBe
    }, 100000);
    test('Delete  existing Post By ID returning error', async () => {
      const ExistingID = '2EFlzO3EXQwcfSBbSfSa'
      const WantedPost = await postRepository.findByID(ExistingID)
      expect(WantedPost).not.toBeNull()
    }, 100000);
})
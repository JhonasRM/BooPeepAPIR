import { PostRepository } from "../../../../Service/Repositories/PostRepository";

describe('UserRepository function getAllPosts to return a Array List of Posts from Firebase', () => {
    let postRepository: PostRepository

    beforeAll(() => {
        postRepository = new PostRepository()
    });

    test('getAllPosts should return an Array of type Posts', async () => {
        const Posts = await postRepository.getAllPosts()
        console.log(Posts)
        expect(Posts).toBeInstanceOf(Array);
        expect(Posts?.data.length).toBeGreaterThan(0);
    }, 10000);
})
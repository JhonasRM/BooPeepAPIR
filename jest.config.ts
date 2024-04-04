import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    './src/Presentation/UseCases/CreateUser/CreateUserUC.test.ts',
    './src/Presentation/UseCases/ReadUser/ReadUserUC.test.ts',
    './src/Presentation/UseCases/ReadAllUsers/ReadAllUserUC.test.ts',
    './src/Presentation/UseCases/CreatePost/CreatePostUC.test.ts',
    './src/Presentation/UseCases/ReadPost/ReadPostUC.test.ts',
    './src/Presentation/UseCases/ReadAllPost/ReadAllPost.UC.test.ts',
    './src/Presentation/UseCases/UpdatePost/UpdatePostUC.test.ts'
    
  ],
};

export default jestConfig;

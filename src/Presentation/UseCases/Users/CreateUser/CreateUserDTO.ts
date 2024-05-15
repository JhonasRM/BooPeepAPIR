import { Post } from "../../../../Service/Model/Post";
import { UserOnAuth } from "../../../../Service/Model/UserOnAuth";
import { UserOnFirestore } from "../../../../Service/Model/UserOnFireStore";

export class CreateUserRequestDTO {
  displayName: string;
  email: string;
  password: string;
  emailVerified: boolean;
  // photoURL: string;
  disabled: boolean;

  constructor(props: Omit<CreateUserRequestDTO, 'emailVerified' | 'disabled' | 'destructuring'>
  ) {
    this.displayName = props.displayName;
    this.email = props.email;
    this.password = props.password;
    this.emailVerified = false;
    // this.photoURL = '';
    this.disabled = false;
  }
  destructuring() {
    const userOnAuth: UserOnAuth = new UserOnAuth(
      this.displayName,
      this.email,
      this.password,
      this.emailVerified,
      this.disabled
    );
    const userOnData: UserOnFirestore = new UserOnFirestore({
      email: this.email,
      password: this.password,
    });
    return { userOnAuth, userOnData };
  }
}

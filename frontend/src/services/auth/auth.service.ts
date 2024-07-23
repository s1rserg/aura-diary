import { ApiPath, ContentType } from "../../common/enums/enums";
import { ApiAuthPayload, SignInCredentials, SignUpCredentials} from "../../common/types/types";
import { getToken } from "../../utils/auth";
import { Http } from "../http/http.service";

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Auth {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.AUTH;
  }

  public getAuthenticatedUser(): Promise<ApiAuthPayload> {
    const token = getToken();
    return this.http.load(this.getUrl(ApiPath.AUTHENTICATED_USER), {
      method: "GET",
      token
    });
  }

  public signIn(credentials: SignInCredentials): Promise<ApiAuthPayload> {
    return this.http.load(this.getUrl(ApiPath.SIGN_IN), {
      method: "POST",
      contentType: ContentType.JSON,
      payload: JSON.stringify(credentials),
    });
  }

  public signUp(credentials: SignUpCredentials): Promise<ApiAuthPayload> {
    return this.http.load(this.getUrl(ApiPath.SIGN_UP), {
      method: "POST",
      contentType: ContentType.JSON,
      payload: JSON.stringify(credentials),
    });
  }

  private getUrl(path = ""): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Auth };
export type { Constructor as AuthConstructor };

import { AccessToken } from "./access-token.model";
import { RefreshTokenDto } from "./refresh-tokenDto.model";

export class LoginResponseModel{
    accessToken:AccessToken;
    refreshTokenDto:RefreshTokenDto
}
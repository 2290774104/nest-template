export class XAPIException extends Error {
  private m_ErrorCode: number;
  private m_URL?: string;
  private m_Method?: string;

  public constructor(
    paramErrorCode: number,
    paramErrMsg: string,
    paramURL?: string,
    paramMethod?: string,
  ) {
    super(paramErrMsg);
    this.m_ErrorCode = paramErrorCode;
    this.name = 'XAPIException';
    this.m_URL = paramURL;
    this.m_Method = paramMethod;
  }

  public get errorCode() {
    return this.m_ErrorCode;
  }

  public get url() {
    return this.m_URL;
  }

  public get method() {
    return this.m_Method;
  }

  public toJSON() {
    return {
      errCode: this.m_ErrorCode,
      message: this.message,
      url: this.m_URL,
      method: this.method,
    };
  }
}

class AdminMessageRequest {
  public id: number;
  public response: string;

  constructor(id: number, message: string) {
    this.id = id;
    this.response = message;
  }
}

export default AdminMessageRequest;

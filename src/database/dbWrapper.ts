import mongoose from "mongoose";

export class DbWrapper {
  private uri: string;
  private clusterName: string;
  private user: string;
  private password: string;

  constructor(clusterName: string, user: string, password: string) {
    this.clusterName = clusterName;
    this.user = user;
    this.password = password;
    this.uri = this.buildURI();
  }

  private buildURI(): string {
    return `mongodb+srv://${this.user}:${this.password}@${this.clusterName}.wthbrcr.mongodb.net/${this.clusterName}?retryWrites=true&w=majority`;
  }

  public async connect(): Promise<typeof mongoose> {
    return await mongoose.connect(this.uri, {});
  }
}

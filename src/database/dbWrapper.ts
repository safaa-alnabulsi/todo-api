import mongoose from "mongoose";

class DbWrapper {
  public uri: string;
  private clusterName: string;
  private user: string;
  private password: string;

  constructor(clusterName: string, user: string, password: string) {
    this.clusterName = clusterName;
    this.user = user;
    this.password = password;
    this.uri = this.buildURI();
    console.log("URI from inside the class: ", this.uri);
  }

  private buildURI(): string {
    return `mongodb+srv://${this.user}:${this.password}@${this.clusterName}.wthbrcr.mongodb.net/${this.clusterName}?retryWrites=true&w=majority`;
  }

  public async connect(): Promise<typeof mongoose> {
    return await mongoose.connect(this.uri, {});
  }

  public async disconnect(): Promise<void> {
    await mongoose.connection.close();
    await mongoose.disconnect();
  }
}

export default DbWrapper;

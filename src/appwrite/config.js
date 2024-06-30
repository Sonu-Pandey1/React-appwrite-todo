
import { Client,Account,Databases,Storage } from "appwrite";
import conf from "../Conf/conf";

const client = new Client();
client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
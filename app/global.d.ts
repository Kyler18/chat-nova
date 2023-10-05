import { Database as DB } from "@/lib/database.types";

type User = DB["public"]["Tables"]["users"]["Row"];
type Chat = DB["public"]["Tables"]["chats"]["Row"];
type Message = DB["public"]["Tables"]["messages"]["Row"];

declare global {
  type Database = DB;
  type TUser = User;
  type TChat = Chat;
  type TMessage = Message;
}

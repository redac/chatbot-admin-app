import { Container, Loading, Text } from "@nextui-org/react";
import { useQuery } from "react-query";
import { getAllChatBots } from "../api/chatbot";
import ChatBotCreate from "../components/ChatBotCreate";
import ChatBotList from "../components/ChatBotList";

function Admin() {
  const { isLoading, isError, error, data } = useQuery("bots", getAllChatBots);
  if (isLoading) return <Loading></Loading>;
  if (isError) return <Text>Something bad happened!</Text>;
  console.log(data);
  return (
    <Container>
      <Text h1 css={{ fontFamily: "Space Grotesk" }}>
        Administration Panel
      </Text>
      <ChatBotCreate></ChatBotCreate>
      <ChatBotList list={data}></ChatBotList>
    </Container>
  );
}

export default Admin;

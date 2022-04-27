import { Button, Col, Container, Grid, Input, Row } from "@nextui-org/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createChatBot } from "../api/chatbot";

function ChatBotCreate() {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation((botName: string) => createChatBot(botName), {
    onSuccess: () => {
      queryClient.invalidateQueries("bots");
    },
  });

  return (
    <>
      <Container>
        <Row gap={2}>
          <Col>
            <Input
              placeholder="Chatbot name"
              width="100%"
              onChange={(e) => {
                console.log(e);
                setName(e.target.value);
                console.log(name);
              }}
            ></Input>
          </Col>
          <Col>
            <Button onClick={() => mutation.mutate(name)}>Create</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ChatBotCreate;

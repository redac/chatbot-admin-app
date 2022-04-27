import { Container, Link, Modal, Table, Text } from '@nextui-org/react';
import { useState } from 'react';
import { ChatBot } from '../models';
import ChatBotEdit from './ChatBotEdit';

export interface ChatBotListProps {
  list: ChatBot[] | undefined;
}

function ChatBotList(props: ChatBotListProps) {
  const [visible, setVisible] = useState(false);
  const closeHandler = () => setVisible(false);
  const handler = () => setVisible(true);
  if (!props.list)
    return <Text>No chatbot was found! Try creating a new one 🤖</Text>;

  const items = props.list.filter((item) => item != null);
  console.log(items);
  return (
    <>
      <Container css={{ mt: 10 }}>
        <Table>
          <Table.Header>
            <Table.Column>Name</Table.Column>
            <Table.Column>Brain</Table.Column>
            <Table.Column>URL</Table.Column>
            <Table.Column>Web</Table.Column>
            <Table.Column>Mastodon</Table.Column>
            <Table.Column>Discord</Table.Column>
            <Table.Column> </Table.Column>
          </Table.Header>
          <Table.Body>
            {items.map((item, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.brain}</Table.Cell>
                  <Table.Cell>{item.url}</Table.Cell>
                  <Table.Cell>{item.web}</Table.Cell>
                  <Table.Cell>{item.mastodon}</Table.Cell>
                  <Table.Cell>{item.discord}</Table.Cell>
                  <Table.Cell>
                    <Link onClick={handler}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-settings"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <ChatBotEdit open={visible}></ChatBotEdit>
      </Container>
    </>
  );
}

export default ChatBotList;

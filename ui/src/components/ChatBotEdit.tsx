import { Col, Container, Input, Modal, Row, Text } from '@nextui-org/react';
import * as Select from '@radix-ui/react-select';

interface ChatBotEditProps {
  open: boolean;
}

function ChatBotEdit(props: ChatBotEditProps) {
  <Modal open={props.open}>
    <Modal.Header>
      <Text>Edit ChatBot</Text>
    </Modal.Header>
    <Modal.Body>
      <Container>
        <Row>
          <Col>
            <Text>Brain :</Text>
          </Col>
          <Col>
            <Select.Root>
              <Select.Trigger>
                <Select.Value />
                <Select.Icon />
              </Select.Trigger>

              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Item>
                    <Select.ItemText />
                    <Select.ItemIndicator />
                  </Select.Item>

                  <Select.Group>
                    <Select.Label />
                    <Select.Item>
                      <Select.ItemText />
                      <Select.ItemIndicator />
                    </Select.Item>
                  </Select.Group>

                  <Select.Separator />
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select.Root>
          </Col>
        </Row>
      </Container>
    </Modal.Body>
  </Modal>;
}

export default ChatBotEdit;

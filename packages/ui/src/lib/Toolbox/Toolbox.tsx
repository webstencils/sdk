import { useEditor } from '@webstencils/core';
import { IconButton, Box, Heading, Flex, Text } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import { IToolboxGroup, IToolboxItem } from './types';

import styles from './Toolbox.module.css';

export const ToolboxItem = (props: any) => {
  return <span className={styles.ToolboxItem} {...props}></span>;
};

export const ToolboxGroup = ({
  group,
  onDeleteItem
}: {
  group: IToolboxGroup;
  onDeleteItem?: (item: IToolboxItem) => void;
}) => {
  const {
    query,
    connectors: { create }
  } = useEditor();

  return (
    <Box key={group.name} mb="4">
      <Box py="2" px="3">
        <Heading as="h4" size={{ initial: '3', md: '2' }}>
          {group.name}
        </Heading>
      </Box>
      {group.items.map((item) => (
        <ToolboxItem key={item.name}>
          <Flex gap="2" align="center" width="100%">
            {item.icon}
            <Text
              size={{ initial: '3', md: '2' }}
              style={{ flex: 1 }}
              ref={(ref: any) => create(ref, () => item.factory(query))}
            >
              {item.name}
            </Text>
            {item.canDelete && (
              <IconButton
                className={styles.ActionButton}
                radius="full"
                variant="soft"
                onClick={() => onDeleteItem?.(item)}
                size="1"
              >
                <TrashIcon />
              </IconButton>
            )}
          </Flex>
        </ToolboxItem>
      ))}
    </Box>
  );
};

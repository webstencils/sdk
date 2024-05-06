import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { ComponentTemplateProperty, useNode } from '@webstencils/core';
import {
  DataList,
  Flex,
  Heading,
  IconButton,
  Popover,
  Separator,
  Text
} from '@radix-ui/themes';

import './PropertyPanel.css';
import { EnumPropEditor } from './editors/EnumPropEditor';
import { StringPropEditor } from './editors/StringPropEditor';
import { TextPropEditor } from './editors/TextPropEditor';
import { BoolPropEditor } from './editors/BoolPropEditor';
import { NumberPropEditor } from './editors/NumberPropEditor';

type PropertyGroupMap = {
  [key: string]: Array<{
    name: string;
    property: ComponentTemplateProperty;
  }>;
};

interface PropertyGroupProps {
  size?: '1' | '2' | '3';
  properties: Array<{
    name: string;
    property: ComponentTemplateProperty;
  }>;
}

export const PropertyGroup = ({
  size = '1',
  properties
}: PropertyGroupProps) => {
  const {
    actions: { setProp },
    componentProps
  } = useNode((node) => ({
    componentProps: node.data.props
  }));

  const setValue = (key: string, value: any) => {
    setProp((props: any) => {
      props[key] = value;
      // console.log(key, props[key]);
    });
  };

  return (
    <DataList.Root orientation="horizontal" size={size}>
      {properties.map(({ name, property }) => {
        const label = property.label || name;
        const propertyValue = componentProps[name] || property.default;

        return (
          <DataList.Item key={name} align="center">
            <DataList.Label minWidth="50px">
              <Flex align="center" gap="2">
                {label}
                {property.description && (
                  <Popover.Root>
                    <Popover.Trigger>
                      <IconButton variant="ghost" color="gray" size={size}>
                        <InfoCircledIcon />
                      </IconButton>
                    </Popover.Trigger>
                    <Popover.Content
                      side="top"
                      align="center"
                      style={{ maxWidth: 350 }}
                      onOpenAutoFocus={(event) => {
                        event.preventDefault();
                        (event.currentTarget as HTMLElement)?.focus();
                      }}
                    >
                      <Text as="div" size={size}>
                        {property.description}
                      </Text>
                    </Popover.Content>
                  </Popover.Root>
                )}
              </Flex>
            </DataList.Label>
            <DataList.Value>
              {(() => {
                switch (property.type) {
                  case 'enum':
                    return (
                      <EnumPropEditor
                        size={size}
                        value={propertyValue}
                        propertyDef={property}
                        onChanged={(value) => setValue(name, value)}
                      />
                    );
                  case 'number':
                    return (
                      <NumberPropEditor
                        size={size}
                        value={propertyValue}
                        propertyDef={property}
                        onChanged={(value) => setValue(name, value)}
                      />
                    );
                  case 'string':
                    return (
                      <StringPropEditor
                        size={size}
                        value={propertyValue}
                        propertyDef={property}
                        onChanged={(value) => setValue(name, value)}
                      />
                    );
                  case 'text':
                    return (
                      <TextPropEditor
                        size={size}
                        value={propertyValue}
                        propertyDef={property}
                        onChanged={(value) => setValue(name, value)}
                      />
                    );
                  case 'boolean':
                    return (
                      <BoolPropEditor
                        size={size}
                        value={propertyValue}
                        propertyDef={property}
                        onChanged={(value) => setValue(name, value)}
                      />
                    );
                  default:
                    return `Unknown type: ${property.type}`;
                }
              })()}
            </DataList.Value>
          </DataList.Item>
        );
      })}
    </DataList.Root>
  );
};

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames('AccordionTrigger', className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Content
      className={classNames('AccordionContent', className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

export const PropertyPanel = () => {
  const { template } = useNode((node) => ({
    template: node.template
  }));

  if (template) {
    const props = Object.entries<ComponentTemplateProperty>(template.props).map(
      ([name, property]) => ({
        name,
        property
      })
    );

    const categories = Object.groupBy(
      props,
      ({ property }) => property.category || 'Basic'
    ) as PropertyGroupMap;
    // console.log(propertyGroups);
    // const hasMultipleCategories = Object.keys(categories).length > 1;

    return (
      <>
        <Heading>{template.name}</Heading>
        <Text size="1">{template.description}</Text>
        <Separator my="3" size="4" />

        {/*{hasMultipleCategories && (*/}
        <Accordion.Root
          className="AccordionRoot"
          type="single"
          defaultValue="Basic"
          collapsible
        >
          {Object.keys(categories).map((category) => (
            <Accordion.Item
              key={category}
              value={category}
              className="AccordionItem"
            >
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                <PropertyGroup properties={categories[category]} />
              </AccordionContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
        {/*)}*/}

        {/*{!hasMultipleCategories && <PropertyGroup properties={props} />}*/}
      </>
    );
  }

  return null;
};

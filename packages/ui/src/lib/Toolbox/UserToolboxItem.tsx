import React from 'react';
import { parseTree } from '@webstencils/core';
import { StackIcon } from '@radix-ui/react-icons';
import { IToolboxItem, IToolboxItemTemplate } from './types';

export class UserToolboxItem implements IToolboxItem {
  icon = (<StackIcon />);
  canDelete = true;

  constructor(
    public name: string,
    public template: IToolboxItemTemplate
  ) {}

  factory(query: any): any {
    return parseTree(this.template, query);
  }
}

import React from 'react';

export type IToolboxItemTemplate = string | { rootNodeId: string; nodes: any };

export interface IToolboxItem {
  name: string;
  description?: string;
  icon?: React.ReactElement;
  template?: IToolboxItemTemplate;
  canDelete?: boolean;
  factory: (query: any) => any;
}

export interface IToolboxGroup {
  name: string;
  items: IToolboxItem[];
}

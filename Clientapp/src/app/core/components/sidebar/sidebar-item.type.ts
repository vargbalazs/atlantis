export type drawerItem = {
  text: string;
  icon?: string;
  selected?: boolean;
  expanded?: boolean;
  parent?: boolean;
  level: number;
  id: string;
  parentId: string;
  children?: drawerItem[];
  routePath?: string;
  translateId?: string;
};

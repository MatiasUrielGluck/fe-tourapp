type DrawerItemType = {
  icon: string;
  routeName?: string;
  label: string;
  position: 'top' | 'bottom';
  separator: boolean;
  onClick?: () => void;
};

export default DrawerItemType;

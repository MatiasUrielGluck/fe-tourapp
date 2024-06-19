type DrawerItemType = {
  icon: string;
  routeName?: string;
  label: string;
  position: 'top' | 'bottom';
  separator: boolean;
  onClick?: () => void;
  show: boolean;
};

export default DrawerItemType;

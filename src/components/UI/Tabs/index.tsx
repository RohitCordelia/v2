import React, { ReactNode, ReactElement, useState } from "react";

type TabProps = {
  className?: string;
  children: Array<ReactElement>;
  tabTitleClassName?:string;
  tabTitleActiveClassName?:string;
};

type TabTitleProps = {
  children: ReactNode;
  key: number;
  onClick?: () => void;
  active?: boolean;
  tabTitleActiveClassName?:string;
};

type TabContentProps = {
  children: ReactNode;
  key: number;
  className?:string;
};

const TabTitle = ({ children, key, onClick, active, tabTitleActiveClassName="" }: TabTitleProps) => {
  return (
    <div
      className={`py-4 px-7 cursor-pointer font-medium font-dmSans shrink-0 text-sm text-center ${
        active ? `text-white border-b-2 border-danger ${tabTitleActiveClassName}` : "text-white/[0.6]"
      }`}
      key={key}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const TabContent = ({ children, key, className="" }: TabContentProps) => {
  return <div key={key} className={className}>{children}</div>;
};

export const Tab = ({ className="", children, tabTitleClassName="", tabTitleActiveClassName="" }: TabProps) => {
  const [activeKey, setActiveKey] = useState<any>("1");
  const getNumberOfChildren = () => {
    let count = 0;
    React.Children.map(children, (child) => {
      if (child.type === TabTitle) {
        count++;
      }
    });
    return count;
  };

  const numberOfTabs = getNumberOfChildren()
  return (
    <div className={`${className}`}>
      <div
        className={`grid grid-cols-${numberOfTabs} justify-between border-b border-white/[0.2] overflow-y-auto md:overflow-y-auto md:overflow-x-clip ${tabTitleClassName}`}
      >
        {React.Children.map(children, (child) => {
          if (child.type === TabTitle) {
            return React.cloneElement(child, {
              onClick: () => {
                setActiveKey(child.key);
              },
              active: child.key === activeKey,
              tabTitleActiveClassName: tabTitleActiveClassName,
            });
          }
        })}
      </div>
      <div className="py-8">
        {React.Children.map(children, (child) => {
          if (child.type === TabContent && child.key === activeKey) {
            return React.cloneElement(child);
          }
        })}
      </div>
    </div>
  );
};

Tab.Title = TabTitle;
Tab.Content = TabContent;
export default Tab;

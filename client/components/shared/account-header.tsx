import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const AccountHeader = ({ children }: Props) => {
  return (
    <div>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
        <h1 className="font-semibold text-lg">{children}</h1>
      </header>
    </div>
  );
};

export default AccountHeader;

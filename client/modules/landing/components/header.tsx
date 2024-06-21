import { Button } from "@/components/ui/button";
import { HandCoins, UserCircle2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export const Header = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <HandCoins className="w-8 h-8" />
        <div>Name</div>
      </div>
      <Link href="/sign-in">
        <UserCircle2 className="w-8 h-8" />
      </Link>
    </div>
  );
};

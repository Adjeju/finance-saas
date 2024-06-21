import React from "react";
import { Header } from "../components";

type Props = {};

const Landing = (props: Props) => {
  return (
    <main className="gradient-screen p-6 text-white relative">
      <Header />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-7xl text-center">
        Your best finance manager
      </div>
    </main>
  );
};

export default Landing;

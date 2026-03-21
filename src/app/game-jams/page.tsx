import PageStyling from "@/components/Common/PageStyling";
import GameJamsContent from "@/components/GameJams";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Jams",
  description: "A collection of Fabio Mangiameli's game jam projects.",
};

const GameJamsPage = () => {
  return (
    <>
      <PageStyling />
      <GameJamsContent />
    </>
  );
};

export default GameJamsPage;

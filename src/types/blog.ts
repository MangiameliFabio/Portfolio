type Author = {
  name: string;
  image: string;
  designation: string;
};

export type Blog = {
  id: number;
  title: string;
  paragraph: string;
  src: string;
  tags: string[];
  keyPoints: string[];
  link: string;
  orgaType: string;
  orgaName: string;
  game: string;
  date: string;
  duration: string;
  teamSize: string;
};

export type Stat = Pick<
  Blog,
  "orgaType" | "orgaName" | "game" | "date" | "duration" | "teamSize"
>;

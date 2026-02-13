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
  orgaType: String;
  orgaName: String;
  game: string;
  date: string;
  duration: string;
};

export type Stat = {
  orgaType: String;
  orgaName: String;
  game: String;
  date: String;
  duration: String;
} 

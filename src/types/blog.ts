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
  teamSize: String;
};

export type Stat = {
  orgaType: String;
  orgaName: String;
  game: String;
  date: String;
  duration: String;
  teamSize: String;
} 

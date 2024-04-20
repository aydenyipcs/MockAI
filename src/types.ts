type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface LinkData {
  href: string;
  name: string;
}

interface AttributeCardProps {
  category: "Communication" | "Problem Solving" | "Algorithms" | "Coding";
  data: SkillProps | undefined;
}

interface StarRatingProps {
  rating: SkillProps["rating"] | undefined;
}

interface HeaderProps {
  name: string;
  type: string;
  difficulty: string;
  date: string;
}

interface SkillProps {
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  strengths: string[];
  weaknesses: string[];
  feedback: string;
}

interface OverviewProps {
  summary: string;
  communication: SkillProps;
  problemSolving: SkillProps;
  algo: SkillProps;
  coding: SkillProps;
}

interface AudioProps {
  url: string;
  time: number;
  duration: number;
  setDuration: SetState<number>;
}

interface TimelineProps {
  url: string;
  transcript: TranscriptEntries[];
  code: [];
}
interface TranscriptEntries {
  time: number;
  speaker: string;
  text: string;
  feedback?: {
    suggestion: string;
    explanation: string;
  }
}
interface TranscriptProps {
  transcript: TranscriptEntries[];
  setTime: SetState<number>;
  duration: number;
}

interface SolutionProps {
  code: string;
  explanation: string;
  tComplex: string;
  sComplex: string;
}


interface TechnicalProps {
  solution: SolutionProps;
  language: string;
  solutions: SolutionProps[];
  optimal: {
      tComplex: string;
      sComplex: string;
  }
}
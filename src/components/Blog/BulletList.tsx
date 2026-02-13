type TaskListProps = {
  title?: string;
  items: string[];
};

const TaskList = ({ title, items }: TaskListProps) => (
  <>
    {title && (
      <p className="text-slate-400 mb-2 text-base leading-relaxed! sm:text-md md:text-lg">
        {title}
      </p>
    )}

    <ul className="text-slate-400 mb-3 md:mb-4 pl-5 list-disc list-outside text-base leading-relaxed! sm:text-md md:text-lg space-y-1 md:space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </>
);

export default TaskList;

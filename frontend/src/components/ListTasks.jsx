import Section from "./Section";
const ListTasks = () => {
  const statuses = ["todos", "inprogress", "completed"];

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:gap-8">
      {statuses.map((status, index) => (
        <Section key={index} status={status} />
      ))}
    </div>
  );
};

export default ListTasks;

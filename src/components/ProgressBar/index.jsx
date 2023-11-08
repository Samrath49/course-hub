import { Progress, Typography } from "@material-tailwind/react";

function ProgressBar({ value }) {
  return (
    <div className="w-full">
      <Progress value={value} color="indigo" size="md" label="Completed" />
    </div>
  );
}

export default ProgressBar;

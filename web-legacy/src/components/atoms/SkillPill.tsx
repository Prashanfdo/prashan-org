type SkillPillProps = {
  skill: string;
};

function SkillPill({ skill }: SkillPillProps) {
  return (
    <span className="inline-block cursor-default bg-gray-200 hover:bg-gray-300  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      {skill}
    </span>
  );
}

export default SkillPill;

import ProjectCard from "./ProjectCard";
import { projectsData } from "../data/ProjectData";

const ProjectCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectCards;

import ProjectCard from "./ProjectCard";
import { projectsData } from "../data/ProjectData";
import { Project } from '../types/Project';

const ProjectCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectCards;

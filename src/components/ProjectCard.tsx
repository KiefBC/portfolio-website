import { Project } from '../types/Project';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={project.image}
                    alt={project.title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description}</p>
                <div className="card-actions justify-end">
                    <a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

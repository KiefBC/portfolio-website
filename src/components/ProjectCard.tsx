const ProjectCard = ({ project }) => {
    <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
            <img
                src="${project.image}"
                alt="${project.title}" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>${project.description}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary" href="${project.link}">Buy Now</button>
            </div>
        </div>
    </div>
}

export default ProjectCard;

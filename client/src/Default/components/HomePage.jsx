import React from 'react';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';
import DefaultDashboard from './DefaultDashboard';

const ProjectCard = ({ projectName, projectDescription, timeLeft, participants }) => {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-name">{projectName}</h3>
        <span className="time-left">{timeLeft} left</span>
      </div>
      <p className="project-description">{projectDescription}</p>
      <div className="project-card-footer">
        <div className="participants">
          {participants.map((participant, index) => (
            <img key={index} src={participant.image} alt={participant.name} className="participant-image" />
          ))}
          <button className="add-participant">+</button>
        </div>
        <span className="days-left">{timeLeft} days left</span>
      </div>
    </div>
  );
};

const HomePage = () => {
  console.log('HomePage rendered');

  const project = {
    projectName: 'Help Build a School',
    projectDescription: 'We are raising funds to build a school in an underserved community.',
    timeLeft: '3 days',
    participants: [
      { name: 'John Doe', image: 'https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=900&auto=format&fit=crop&q=60' },
      { name: 'Jane Smith', image: 'https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=900&auto=format&fit=crop&q=60' },
    ],
  };

  return (
    <div className="home-page">
      <DefaultDashboard />

      {/* New Navigation Bar for Managing Donations */}
      <nav className="donation-management-nav">
        {/* <ul>
          <li><Link to="/manage-donations/overview">Overview</Link></li>
          <li><Link to="/manage-donations/add-project">Manage Donations</Link></li>
          <li><Link to="/manage-donations/donors">View Donors</Link></li>
          <li><Link to="/manage-donations/reports">Reports</Link></li> */}
        {/* </ul> */}
      </nav>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="left-content">
          <h1>Welcome to Our Donation Platform</h1>
          <p>
            Join us in making a difference! We support various charitable causes
            and help fund projects for those in need. You can donate,
            participate, or simply spread the word.
          </p>
          <div className="buttons">
            <Link to="/find-donations" className="find-donations-button">
              Find Donations
            </Link>
            <Link to="/register" className="support-charities-button">
              Support Charities
            </Link>
          </div>
        </div>
        <div className="image-content">
          <img
            src="https://images.unsplash.com/photo-1692636383649-f3c360c17f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Donation Platform"
          />
        </div>
      </section>

      {/* Donation Management Section */}
      <section className="donation-management reverse-direction">
        <div className="donation-left">
          <h2>Streamline Donation Management</h2>
          <p>
            Charity Connect simplifies the process of managing donations by
            providing secure online payment options, tracking contributions, and
            generating reports for transparency. This helps organizations focus
            on their mission of helping those in need.
          </p>
        </div>
        <div className="donation-right">
          <img
            src="https://images.unsplash.com/photo-1592829238140-d5b194da621f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Donation Management"
          />
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="projects-section">
        <div className="projects-section-header">
          <h2>Featured Projects</h2>
          <p>
            Help make a difference by contributing to these ongoing projects.
          </p>
        </div>
        <div className="project-cards">
          <ProjectCard
            projectName={project.projectName}
            projectDescription={project.projectDescription}
            timeLeft={project.timeLeft}
            participants={project.participants}
          />
        </div>
      </section>

      {/* Increase Ways to Contribute Section */}
      <section className="increase-section reverse-direction">
        <div className="increase-left">
          <h2>Increase Your Impact</h2>
          <p>
            There are many ways you can contribute and make a bigger difference.
            Whether through donations or volunteering, your support is
            invaluable.
          </p>
        </div>
        <div className="increase-right">
          <img
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Community Support"
          />
        </div>
      </section>

      {/* Build Lasting Relationships Section */}
      <section className="relationships-section">
        <div className="relationships-left">
          <h2>Build Lasting Relationships</h2>
          <p>
            By using Charity Connect, organizations can nurture relationships
            with donors through personalized communication, updates on projects,
            and showing the impact of their contributions. This fosters trust
            and loyalty, encouraging continued support.
          </p>
        </div>
        <div className="relationships-right">
          <img
            src="https://images.unsplash.com/photo-1643321613180-68d62b93cb79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzEwMDIzODV8&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Building Relationships"
          />
        </div>
      </section>

      {/* Ongoing Projects Section */}
      <section className="more-projects">
        <h2>Ongoing Projects</h2>
        <div className="project-cards">
          <ProjectCard
            projectName="Help Build a Hospital"
            projectDescription="We are raising funds to build a much-needed hospital in an underserved region."
            timeLeft="10 days"
            participants={[
              {
                name: "Alice",
                image:
                  "https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=900&auto=format&fit=crop&q=60",
              },
              {
                name: "Bob",
                image:
                  "https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=900&auto=format&fit=crop&q=60",
              },
            ]}
          />
        </div>
      </section>

      {/* Support Charities Now Section - Placed at the Bottom */}
      <section className="support-charities-now">
        <div className="left-content">
          <h1>Support Local Charities Now.</h1>
          <blockquote>
            “Charity Connect has been a game-changer for our organization. It
            has helped us connect with donors in a more meaningful way and
            manage donations efficiently. I highly recommend it to any charity
            looking to make a real impact.” - Paul Adams
          </blockquote>
          <div className="buttons">
            <Link to="/support-charities" className="support-charities-button">
              Support Charities
            </Link>
          </div>
        </div>
        <div className="image-content">
          <img
            src="https://images.unsplash.com/photo-1497375638960-ca368c7231e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzEwMDI3MTR8&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Charity Connect"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
